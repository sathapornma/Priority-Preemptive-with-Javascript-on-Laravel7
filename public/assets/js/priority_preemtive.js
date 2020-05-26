var totalprocess = 0,
    maximum = 5;
var cpuStartTime, cpuEndTime;
var arrivaltime = [],
    bursttime = [],
    priority = [],
    proc = [];
var wt = [0, 0, 0, 0, 0];
var tat = [0, 0, 0, 0, 0];

var wavg = 0;
var tavg = 0;

var stime = [0, 0, 0, 0, 0];
var ctime = [0, 0, 0, 0, 0];

var color = ["#fc0303", "#fcba03", "#03fc07", "#03fcf0", "#fc03f4", "#ff8f8f"];

$(function() {

    //console.log(proc);

    addPro();
    addPro();
    // add process!
    $(".add-pro").click(function() {
        addPro();
    });

    // remove process!
    $(".remove-pro").click(function() {
        removePro();
    });

    //run process
    $(".run-pro").click(function() {
        console.log("running");
        cpuStartTime = 0;
        cpuEndTime = 0;
        getDataProcess();
        Timer = setInterval(function() { timeCounter() }, 1000);


    });
});

function addPro() {
    let process = "<input class='text-center' style='width:" + 40 + "px; background-color:" + color[totalprocess] + "' value='P" + (totalprocess + 1) + "' disabled>";
    let status = "<input type='text' id='status_" + totalprocess + "' value='NEW' disabled>";
    let arr = "<input type='number' id='arr_" + totalprocess + "' value='0'>";
    let bru = "<input type='number' id='brust_" + totalprocess + "' value='0'>";
    let pri = "<input type='number' id='pri_" + totalprocess + "' value='1'>";

    let markup = "<tr>" +
        "<td>" + process + "</td>" +
        "<td>" + status + "</td>" +
        "<td>" + arr + "</td>" +
        "<td>" + bru + "</td>" +
        "<td>" + pri + "</td>" +

        +"</tr>";
    if (totalprocess < maximum) {
        $(".tprocess tbody").append(markup);
        totalprocess++;
    } else {
        alert("Sorry!! : Process is maximumimum " + maximum + ".");
    }
}

function removePro() {
    if (totalprocess > 0) {
        let c = confirm("You want delete?");
        if (c == true) {
            $(".tbprocess tr:last").remove();
            totalprocess--;
        }
    } else {
        alert("Sorry!! : Process is minimum " + totalprocess + ".");
    }
}

function getDataProcess() {
    //Clear the process
    proc = [];

    for (let i = 0; i < totalprocess; i++) {

        let l = [];
        for (let j = 0; j < 4; j++) {
            l.push(0);
        }
        proc.push(l);

        arrivaltime[i] = parseInt($("#arr_" + i).val());
        bursttime[i] = parseInt($("#brust_" + i).val());
        priority[i] = parseInt($("#pri_" + i).val());

        proc[i][0] = arrivaltime[i];
        proc[i][1] = bursttime[i];
        proc[i][2] = priority[i];
        proc[i][3] = i + 1;

        cpuEndTime += bursttime[i];
    }

    proc.sort(key = function(x) { return x[2] });
    proc.sort();

    //console.log(proc);
}

function ganttChart(ct, pp) {
    let makeChart;
    makeChart = "<div class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' style='width:" + ct + 10 + "%; background-color:" + color[pp] + "' aria-valuenow='" + ct + "' aria-valuemin=" + 0 + "' aria-valuemax='100'>" + ct + "</div>";
    $(".progress").append(makeChart);

}

function timeCounter() {
    if (cpuStartTime <= cpuEndTime) {
        $("#cpuStartTime").text(cpuStartTime);
        $("#cpuEndTime").text(cpuEndTime);
        $("#cpuStatus").html("<b class='text-warning'>Running...</b>");
        cpuStartTime++;

    } else {
        runProc();
        clearInterval(Timer);
        $("#cpuStatus").html("<b class='text-success'>Terminate !!</b>");
    }

}

function WaitingTime(wwt) {
    let service = [0, 0, 0, 0, 0];

    service[0] = 0;
    wwt[0] = 0;

    for (let i = 1; i < totalprocess; i++) {
        service[i] = proc[i - 1][1] + service[i - 1];
        wwt[i] = service[i] - proc[i][0] + 1;

        if (wwt[i] < 0)
            wwt[i] = 0;
    }
}

function TurnAroundTime(tatt, wwt) {
    for (let i = 0; i < totalprocess; i++) {
        tatt[i] = proc[i][1] + wwt[i];
    }
}

function runProc() {

    WaitingTime(wt);

    TurnAroundTime(tat, wt);

    stime[0] = 0;
    ctime[0] = stime[0] + tat[0];

    for (let i = 1; i < totalprocess; i++) {
        stime[i] = ctime[i - 1]
        ctime[i] = stime[i] + tat[i] - wt[i];
    }

    console.log("Process_no\tStart_time\tComplete_time",
        "\tTurn_Around_Time\tWaiting_Time");
    for (let i = 0; i < totalprocess; i++) {
        wavg += wt[i];
        tavg += tat[i];

        console.log(proc[i][3] + "\t\t\t\t" + stime[i] + "\t\t\t\t" + ctime[i] + "\t\t\t\t" + tat[i] + "\t\t\t\t\t" + wt[i]);
        //console.log();
    }

    console.log("Average waiting time is : " + wavg / totalprocess);
    console.log("average turnaround time : " + tavg / totalprocess);

}

function changeStatus(p, s) {
    //pPrev = [process, brust];
    if (pPrev[1] <= 0) {
        $("#status_" + pPrev[0]).val('TERMINATED');
    } else {
        $("#status_" + pPrev[0]).val('READY');
        //console.log(pPrev[0]);
        //console.log(waitPro[pPrev[0]][3]);
        // [arrivaltime, i, running, status]
        /*pp = pPrev[0];
        waitPro[pp][3] = 1; //set status ready.*/

    }

    if (s <= 0) {
        $("#status_" + p).val('TERMINATED');
    } else {
        $("#status_" + p).val('RUNNING');
    }


}