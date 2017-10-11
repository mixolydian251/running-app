 // Events responsible for view navigation
    function navigate() {
        var selectType;

     // Elements for view nav
        const run = document.getElementById('run');
        const data = document.getElementById('data');
        const settings = document.getElementById('settings');
        const upload = document.getElementById('upload');
        const reset = document.getElementById('reset');

     // Event compatibility
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            selectType = 'touchend'
        } else {selectType = 'click'}

     // Uploads
        if(upload){
            upload.addEventListener(selectType, () => {
                var push = confirm('Do you want to save this run?');
                if (push === true){
                    alert('Your run has been saved!')
                }
            });
        }
     // Reset time
        if(reset){
            reset.addEventListener(selectType, ()=> {
                window.location.replace("http://localhost:63342/runningApp/run_app/views/run_app.html");
            });
        }

        if (window.location.pathname !== "/runningApp/run_app/views/run_app.html")
        run.addEventListener(selectType, ()=> {
            window.location.replace("http://localhost:63342/runningApp/run_app/views/run_app.html");
        });

        data.addEventListener(selectType, ()=> {
            window.location.replace("http://localhost:63342/runningApp/run_app/views/data.html");
        });

        settings.addEventListener(selectType, ()=> {
            window.location.replace("http://localhost:63342/runningApp/run_app/views/settings.html");
        });
    }

    window.addEventListener('DOMContentLoaded', () => {
        navigate()
    });


