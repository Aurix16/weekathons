 $(document).ready(function() {
        var lightsaber_sound = document.createElement("audio");
        lightsaber_sound.src="lightsaber_01.wav";
        lightsaber_sound.volume=1;
        lightsaber_sound.autoPlay=false;
        lightsaber_sound.preLoad=true;       
        lightsaber_sound.style = "visibility: hidden;";

        $("body").append(lightsaber_sound);

        $("#saber_handle").click(function() {
            var isChecked = $("input[type='checkbox']").prop('checked');
            if (!isChecked) {
                lightsaber_sound.play();
            }
        });

    });