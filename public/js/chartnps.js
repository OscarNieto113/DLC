    // Este utiliza datos ejemplo por el momento
    const data1 = {
        labels: ['Detractores', 'Promotores', 'Pasivos'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', //red
                'rgba(54, 162, 235, 0.2)', //blue
                'rgba(75, 192, 192, 0.2)', //green
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    }

    const options1 = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            yAxes: [{
                stacked: true,
            }],
            xAxes: [{
                gridLines: {
                    display: false
                }
            }]
        }
    };



    const myChart = new Chart('npsPIE', {
        type: 'doughnut',
        options: options1,
        data: data1
    });
