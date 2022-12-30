// apply listeners for popovers, modals, etc.

let open_controls = document.getElementsByClassName('modal-open');

for (element of open_controls) {

    let open_target_id = element.getAttribute('aria-controls');
    let open_target = document.getElementById(open_target_id);

    open_target.style.display='none';

    element.addEventListener('click', function(e) {
        e.preventDefault();
        open_target.style.display='block';
    })


}


let close_controls = document.getElementsByClassName('modal-close');

for (element of close_controls) {

    let close_target_id = element.getAttribute('aria-controls');
    let close_target = document.getElementById(close_target_id);

    element.addEventListener('click', function(e) {
        e.preventDefault();
        close_target.style.display='none';
    })
}