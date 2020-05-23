var totalprocess = 0;
var maximum = 5;
var color = ["#fc0303", "#fcba03", "#03fc07", "#03fcf0", "#fc03f4", "#ff8f8f"];
var cpuStartTime, cpuEndTime;
var proc;
var arrivaltime, brusttime, priority; // in array
var queue,
    balance;

$(function() {
    addPro();
    addPro();
    // add process!
    $(".add-pro").click(function() {
        //console.log(p)
        addPro();
        $("tbody .chart").remove();
    });

    // remove process!
    $(".remove-pro").click(function() {
        removePro();
        $("tbody .chart").remove();
    });

    //run process
    $(".run-pro").click(function() {
        console.log("running");
        cpuStartTime = 0;
        cpuEndTime = 0;

        $("tbody .chart").remove();
        getDataProcess();

        Timer = setInterval(function() { timeCounter() }, 1000);


    });
});

function addPro() {
    //var checkbok = "<input type='checkbox' name='record'>";
    let process = "<b>P" + totalprocess + "</b>";
    let status = "<input type='text' class='status' id='status_" + totalprocess + "' value='NEW' disabled>";
    let arr = "<input type='number' id='arr_" + totalprocess + "' value='0'>";
    let bru = "<input type='number' id='brust_" + totalprocess + "' value='0'>";
    let pri = "<input type='number' id='pri_" + totalprocess + "' value='1'>";

    let markup = "<tr>" +
        /*"<td>" + checkbok + "</td>" +*/
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
    //clear process
    proc = [];
    let arrPrev = 0,
        priPrev = 0;
    let a = [],
        b = [];

    // get arrival ,brust ,pri
    // set CPU Time
    for (let i = 0; i < totalprocess; i++) {
        arrivaltime = parseInt($("#arr_" + i).val());
        brusttime = parseInt($("#brust_" + i).val());
        priority = parseInt($("#pri_" + i).val());

        cpuEndTime += brusttime; //set cpuStartTime by brust
        proc.push([arrivaltime, brusttime, priority]); // push to array

    }

    //sort process with arrival
    proc.sort((a, b) => a[0] - b[0]);
    //console.log(proc);
    for (let i = 0; i < totalprocess; i++) {
        if (proc[i][0] == arrPrev) {
            if (proc[i][2] <= priPrev) {
                a = proc.pop(); //Last
                b = proc.pop(); //Prev
                proc.push(a);
                proc.push(b);
            }
        }

        arrPrev = proc[i][0];
        priPrev = proc[i][2];
    }

    console.log(proc);
}

function ganttChart() {
    let makeChart;
    $("tbody .chart").remove();
    for (let i = 0; i < totalprocess; i++) {
        makeChart = "<th class='chart' style='background-color:" + color[i] + "'>P" + i + "</th>";
        $(".tchart .tgantt-chart").append(makeChart);
        makeNumChart = "<td class='chart text-right'>" + i + "</td>";
        $(".tchart .tnumgantt-chart").append(makeNumChart);
    }
}

function timeCounter() {
    if (cpuStartTime <= cpuEndTime) {
        $("#cpuStartTime").text(cpuStartTime);
        $("#cpuEndTime").text(cpuEndTime);
        $("#cpuStatus").html("<b class='text-warning'>Running...</b>");
        runProc(proc, cpuStartTime);
        cpuStartTime++;

    } else {
        clearInterval(Timer);
        $("#cpuStatus").html("<b class='text-success'>Terminate !!</b>");
        ganttChart();
    }

}

function runProc(pro, ct) {
    let arrPrev = 0,
        priPrev = 5;
    let arrNow, brustNow, priNow;
    queue = [];

    /*
        for (let i = 0; i < totalprocess; i++) {
            if (pro[i][0] == ct && pro[i][2] <= priPrev) {
                pro[i][1] -= ct;
                queue.push(pro[i]);
                //queue.sort((a, b) => a[2] - b[2]);
                console.log("queue : ");
                console.log(queue);

                arrPrev = pro[i][0];
                priPrev = pro[i][2];

            }
        }*/

}
/*
pb = [];
pb.push([2, 5, 3]);
pb.push([0, 2, 4]);
pb.push([15, 2, 1]);
console.log(pb.sort((a, b) => a[0] - b[0]));
*/