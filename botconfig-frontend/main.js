/**
 * Created by manuel.schwalm on 15.10.17.
 */
$(document).ready(() => {

    let row = 1;
    let lastRow = $("#row1");
    $("#add").click(e => {
        $("table").append($('<tr class="row" id="row' + row + '"></tr>'));
        lastRow = $("#row" + row);
        for(let i = 0; i<6; i++){
            lastRow.append($('<td id="' + row + '-' + i + '"><input type="text" id="in' + row + '-' + i + '"></td>'));
        }
        row++;
    });


    $("#qb").click(e => {
        let pay = {
            "prediction":$("#query")[0].value,
            "agentName":$("#agentName")[0].value
        };
        $.post("http://127.0.0.1:3000/predict", pay).then(res => {
            console.log(res);
            $("#out").text(res.message);
        }).catch(res => {
            $("#out").text(res.message);
        });

    })

    $("#delete").click(e => {
        $.get("http://127.0.0.1:3000/delete?agentName=" + $("#agentName")[0].value).then(res => {
            $("#out").text(res.message);
        }).catch(res => {
            $("#out").text(res.message);
        });
    })

    $("#submit").click(e => {
            let data = {
                "name":$("#agentName")[0].value,
                "Intents":[]
            };
            let row = $(".row");
            for(let i = 0; i<row.length; i++){
                let nextIntent = {
                    "name":$("#in" + (i+1) + "-0")[0].value,
                    "questions":[]
                };
                for(let j = 1; j<6; j++){
                    let nextQ = $("#in" + (i+1) + "-" + j)[0].value;
                    if(nextQ !== "")
                        nextIntent.questions.push(nextQ);
                }
                data.Intents.push(nextIntent);
            }
            $.post("http://127.0.0.1:3000/createAgent", data).then(res => {
                    $("#out").text(res.message);
            }).catch(res => {
                $("#out").text(res.message);
            });

    });
    for(let i = 0; i<6; i++){
        lastRow.append($('<td id="' + row + '-' + i + '"><input type="text" id="in' + row + '-' + i + '"></td>'));
    }
    row++;


});