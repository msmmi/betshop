$(document).ready(function(){
    var betForm = $(".form-betslip-ajax")

    betForm.submit(function(event){
        event.preventDefault();
        var thisForm = $(this)
        var actionEndpoint = thisForm.attr("action");
        var httpMethod = thisForm.attr("method");
        var formData = thisForm.serialize();

        $.ajax({
            url: actionEndpoint,
            method: httpMethod,
            data: formData,
            success: function(data){
                dataSlipBets = JSON.parse(data.slipBets)
                var slipOdds = document.getElementById('slip-table-body')
                var slipBetsHtml = ""

                /*slipOdds.text(data.slipOdds + " $" + data.slipDue)*/
                for (i = 0; i < dataSlipBets.length; i++) {
                    betNumb = i + 1
                    tableBet = dataSlipBets[i]
                    slipBetsHtml += "<tr><th scope='row'>" + betNumb +"</th><td><a href='#'>" + tableBet.fields.home + ": " + tableBet.fields.type + "</a></td><td>" + tableBet.fields.price + "</td></tr>"
                    slipBetsHtml += "<tr><td></td><th scope='row'><input type='number' min='0.01' step='0.01' class='form-control mr-sm-2' id=" + tableBet.pk + " name=" + tableBet.pk + " placeholder=Amount></th></tr>"
                    $('#slip-table-body').html(slipBetsHtml)
                };
            },
            error: function(errorData){
                console.log(errorData)
            }
        })
    })

    var betForm = $(".form-parley-ajax");

    betForm.submit(function(event){
        event.preventDefault();
        var thisForm = $(this);
        var actionEndpoint = thisForm.attr("action");
        var httpMethod = thisForm.attr("method");
        var formData = thisForm.serialize();

        $.ajax({
            url: actionEndpoint,
            method: httpMethod,
            data: formData,
            dataType: 'json',
            success: function(data){
                var slipOdds = $(".betslip-span")
                var options, index, select, option;

                slipOdds.text(data.slipOdds + " $" + data.slipDue);
                select = document.getElementById('bet_id');
                select.options.length = 0;

                dataBet = JSON.parse(data.oddsRemain); // Or whatever source information you're working with
                for (i = 0; i < dataBet.length; i++) {
                    option = dataBet[i];
                    select.options.add(new Option(option.fields.price, option.pk));
                };

                dataSlipBets = JSON.parse(data.slipBets);
                var slipTableHtml = ""
                var tableBet, table, betNumb
                table = document.getElementById('slip-table-body')
                for (i = 0; i < dataSlipBets.length; i++) {
                    betNumb = i + 1
                    tableBet = dataSlipBets[i]
                    slipTableHtml += "<tr><th scope='row'>" + betNumb +"</th><td><a href='#'>" + tableBet.fields.home + ": " + tableBet.fields.type + "</a></td><td>" + tableBet.fields.price + "</td></tr>"
                    $('#slip-table-body').html(slipTableHtml)
                };

            },
            error: function(errorData){
                console.log(errorData)
            }
        });
    });

    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active')
    });

});