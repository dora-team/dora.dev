# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.hugo
    pkgs.nodejs_20
    pkgs.nodePackages.npm
    pkgs.firebase-tools
  ];

  # Sets environment variables in the workspace
  env = {};


  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          command = [
            "hugo"
            "serve"
            "-s"
            "hugo"
            "-D"
            "--bind"
            "0.0.0.0"
            "--port"
            "$PORT"
            "--baseURL"
            "$WEB_PREVIEW_URL"
          ];
          manager = "web";
        };
      };
    };
  };
}
