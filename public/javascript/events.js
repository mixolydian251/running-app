

 // Events responsible for view navigation
    function navigate() {
        var selectType;

     // Elements for view nav
        const run = document.getElementById('run');
        const data = document.getElementById('data');
        const settings = document.getElementById('settings');
        const reset = document.getElementById('reset');

     // Event compatibility
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            selectType = 'touchend'
        } else {selectType = 'click'}

     // Reset time
        if(reset){
            reset.addEventListener(selectType, ()=> {
                window.location.replace("http://" + window.location.host + "/");
            });
        }

        if (window.location.pathname !== "/"){
            run.addEventListener(selectType, ()=> {
                window.location.replace("http://" + window.location.host + "/");
            });
        }

        if (window.location.pathname !== "/data"){
            data.addEventListener(selectType, ()=> {
                window.location.replace("http://" + window.location.host + "/data");
            });
        }

        if (window.location.pathname !== "/settings"){
            settings.addEventListener(selectType, ()=> {
                window.location.replace("http://" + window.location.host + "/settings");
            });
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        navigate()
    });


