$( document ).ready(function() {

    function calulateTo(amount, energyType) {
        var convArr = {"Joules": 1, "KWh": 3.6e6, 'Barrels of Oil': 6383087908.4, 'Calories': 4.18, "Kg of Uranium": 3.9e12, "Kg of Coal": 2.4e7, "Kg of Firewood": 1.6e7}
        var val_joules = amount * convArr[energyType] 
        calculateResults(val_joules)
        var val_all = []
        for (const [key, value] of Object.entries(convArr)) {
            if(key != energyType) {
                val_all.push({key: key, value: (val_joules / value)})
            }
        }
        return val_all
    }
    function calculateResults(amount) {
        var conversions = [
            {"name": "Microwave", "pre_name": "using a microwave for", "post_name": "seconds", "type": "Watts", "amount": 900, 'display': 'seconds'}, 
            {"name": "Electric shower", "pre_name": "Using an Electric shower for", "post_name": "seconds", "type": "Watts", "amount": 9000, 'display': 'minutes'},
            {"name": "Train", "pre_name": "Riding a train at", "post_name": "seconds", "type": "Watts", "amount": 2312000, 'display': 'minutes'}, 
            {"name": "Rocket", "pre_name": "Using a rocket for", "post_name": "seconds", "type": "Watts", "amount": 60000000000, 'display': 'seconds'},
            {"name": "Fridge", "pre_name": "Using a fridge for", "post_name": "seconds", "type": "Watts", "amount": 500, 'display': 'hours'}, 
            {"name": "Wind Turbine", "pre_name": "Charging energy with a wind turbine for", "post_name": "seconds", "type": "Watts", "amount": 1000000, 'display': 'hours'},
            {"name": "Solar Panel", "pre_name": "Charging energy with a solar panel for", "post_name": "seconds", "type": "Watts", "amount": 300, 'display': 'hours'}, 
            {"name": "F1 racecar", "pre_name": "Driving an F1 racecar with 1050 HP for", "post_name": "seconds", "type": "Watts", "amount": 780000, 'display': 'minutes'},
            {"name": "Steak", "pre_name": "Eating ", "post_name": "Kg of a steak", "type": "Joules/KG", "amount": 9079280, 'display': 'kg'}, 
            {"name": "Rowing", "pre_name": "Rowing for", "post_name": "seconds", "type": "Watts", "amount": 300, 'display': 'minutes'}, 
            {"name": "Usain Bolt", "pre_name": "Running as fast a Usain Bolt for", "post_name": "seconds", "type": "Watts", "amount": 2619, 'display': 'seconds'}, 
            {"name": "TDF Cyclist", "pre_name": "Cycling like a Tour de France Cyclist for", "post_name": "seconds", "type": "Watts", "amount": 450, 'display': 'seconds'}, 
            {"name": "Airconditioning", "pre_name": "Using an air conditioning unit for", "post_name": "seconds", "type": "Watts", "amount": 2000, 'display': 'minutes'}, 
            {"name": "Cheetah", "pre_name": "Running like a cheetah for", "post_name": "seconds", "type": "Watts", "amount": 500, 'display': 'seconds'}, 
            {"name": "Sun", "pre_name": "Energy generated by one cube in the sun for", "post_name": "seconds", "type": "Watts", "amount": 275, 'display': 'hours'}, 
        ]
        var htmlString = "";
        for(var i of conversions){
            var seconds = amount / i.amount;
            switch(i.display) {
                case 'seconds':
                    i.time = seconds
                    break;
                case 'minutes':
                    i.time = seconds / 60
                    break;
                case 'hours':
                    i.time = seconds/3600;
                    break;
                default:
                    i.time = seconds;
                    break;
            }
            i.seconds = seconds
            var prioritize
            if(seconds > 1e8) {
                prioritize = 1
            } else if(seconds < 1 || seconds > 1e6) {
                prioritize = 2
            } else if( seconds > 1e4) {
                prioritize = 3
            } else{
                prioritize = 4
            }
            i.prioritize = prioritize;
        }
        const sorted_conversions = conversions.sort((a,b) => b.prioritize - a.prioritize);

        for(var i of sorted_conversions) {
            htmlString += '<div class="col mb-5">' +
                            '<div class="card" style="min-width: 200px; min-height: 150px; border-radius: 25px; border: 2px solid white; background-color: #327849">' +
                                '<div class="card-body">' +
                                    '<h5 class="card-title text-white">' + i.name +'</h5>' +
                                    '<h6 class="card-subtitle text-white">' + i.time.toFixed(2) + " " + i.display + '</h6>' +
                                    '<p class="card-text text-white">' + i.pre_name + " " + i.amount + " " + i.type + '</p>' +
                                '</div>' +
                            '</div>' +
                           '</div>'
        }
        $('#examples').html(htmlString);
    }
    function reload() {
        var amount = $('#amount').val();
        var energyType = $('#energyType').val();
        var val = calulateTo(amount, energyType)
        var htmlString = "<div class='row mt-3 mb-3'>"
        for (const [key, value] of Object.entries(val)) {
            if(value.value > 1 && value.value < 1000) {
                htmlString = htmlString + 
                "<div class='col mb-3' >" +
                "<div class='d-flex align-items-center justify-content-center' style='color: white; min-height: 150px; border-radius: 25px; border: 2px solid white; background-color: #2596be;'>" + 
                value.value.toFixed(2) +
                " " + 
                value.key +
                "</div></div>"
            } else {
                htmlString = htmlString + 
                "<div class='col mb-3'>" +
                "<div class='d-flex align-items-center justify-content-center' style='color: white; min-height: 150px; border-radius: 25px; border: 2px solid white; background-color: #2596be;'>" + 
                value.value.toExponential(2) +
                " " + 
                value.key +
                "</div></div>"
                // '<div class="card" style="min-height: 200px;"><div class="card-body"><h5 class="card-title">Card Title</h5><p class="card-text">Some quick example text to build on the card.</p></div></div>'
            }
        }
        htmlString = htmlString + "</div>"
        $('#energy_results').html(htmlString);
    }
    $('#amount').on('input', function(e) {
        reload();
    })
    $('#energyType').on('change', function(e) {
        reload();
    })
});