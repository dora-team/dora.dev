#!/bin/bash

# Exit on error
set -e

# Arguments:
# $1: Content path (e.g., insights/my-new-post.md)

if [ -z "$1" ]; then
  echo "Usage: $0 <content-path>"
  echo "Example: $0 insights/my-new-post.md"
  exit 1
fi

CONTENT_ARG="$1"

# Ensure we are in the project root (check for hugo directory)
if [ ! -d "hugo" ]; then
  echo "Error: Could not find 'hugo' directory. Please run this script from the project root."
  exit 1
fi

# 1. Create content using Hugo
echo "Creating content..."
cd hugo
hugo new "$CONTENT_ARG"
cd ..

# 2. Determine paths for the test file
# Remove .md extension
CLEAN_PATH="${CONTENT_ARG%.md}"

# Handle 'index' for page bundles (e.g., insights/my-post/index -> insights/my-post)
if [[ "$CLEAN_PATH" == *"/index" ]]; then
  PAGE_PATH="${CLEAN_PATH%/index}"
  TEST_FILENAME="${PAGE_PATH##*/}.spec.ts"
  TEST_DIR_REL="${PAGE_PATH%/*}"
else
  PAGE_PATH="$CLEAN_PATH"
  TEST_FILENAME="${PAGE_PATH##*/}.spec.ts"
  TEST_DIR_REL="${PAGE_PATH%/*}"
fi

# If the path was just a filename (no directory), fix TEST_DIR_REL
if [[ "$PAGE_PATH" == "$TEST_FILENAME" ]]; then
    TEST_DIR_REL=""
fi

# Construct full test path
TEST_DIR="test/playwright/tests/$TEST_DIR_REL"
TEST_FILE="$TEST_DIR/$TEST_FILENAME"

# 3. Calculate relative depth for imports (e.g., ../../constants)
# Count slashes in the relative path to determine depth
if [ -z "$TEST_DIR_REL" ]; then
    DEPTH=0
else
    DEPTH=$(echo "$TEST_DIR_REL" | tr -cd '/' | wc -c)
    DEPTH=$((DEPTH + 1))
fi

IMPORT_PREFIX=""
for ((i=0; i<DEPTH; i++)); do
  IMPORT_PREFIX="../$IMPORT_PREFIX"
done
if [ -z "$IMPORT_PREFIX" ]; then
  IMPORT_PREFIX="./"
fi

# 4. Generate Title from filename (kebab-case -> Title Case)
SLUG="${PAGE_PATH##*/}"
TITLE=$(echo "$SLUG" | sed -E 's/-/ /g' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')

# 5. Create Test File
if [ -f "$TEST_FILE" ]; then
  echo "Test file already exists at $TEST_FILE. Skipping creation."
else
  echo "Creating test file at $TEST_FILE..."
  mkdir -p "$TEST_DIR"

  # Check if content is an insight
  IS_INSIGHT=false
  if [[ "$CONTENT_ARG" == "insights/"* ]]; then
    IS_INSIGHT=true
  fi

  IMPORTS="import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from '${IMPORT_PREFIX}constants';"

  EXTRA_TESTS=""
  if [ "$IS_INSIGHT" = true ]; then
      IMPORTS="$IMPORTS
import { verifyAuthors } from '${IMPORT_PREFIX}verify-authors';"
      EXTRA_TESTS="

  test('displays authors.', async ({ page }) => {
    await verifyAuthors(page);
  });"
  fi

  cat <<EOF > "$TEST_FILE"
$IMPORTS

test.describe('${TITLE} page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/${PAGE_PATH}/');
  });

  test('has the correct title.', async ({ page }) => {
    // TODO: Verify the actual title in the browser or frontmatter
    await expect(page).toHaveTitle(/DORA | ${TITLE}/);
  });

  test('has the correct header.', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '${TITLE}', level: 1 })).toBeVisible();
  });

  test('displays its last updated date.', async ({ page }) => {
    await expect(page.locator('.updated')).toContainText(LAST_UPDATED_DATE_REGEX);
  });$EXTRA_TESTS
});
EOF
fi

echo "✅ Success!"
echo "Content: hugo/content/$CONTENT_ARG"
echo "Test:    $TEST_FILE"
