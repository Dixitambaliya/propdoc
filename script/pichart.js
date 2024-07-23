const svgNS = "http://www.w3.org/2000/svg";

    function drawPieChart(elementId, data) {
      const total = data.reduce((sum, item) => sum + item.value, 0);
      let currentAngle = -0.5 * Math.PI;
      const radius = 100; // Adjusted radius for smaller charts

      const chart = document.createElementNS(svgNS, "svg");
      chart.setAttribute("viewBox", "0 0 200 200");
      chart.setAttribute("preserveAspectRatio", "xMidYMid meet");
      chart.setAttribute("width", "100%");
      chart.setAttribute("height", "100%");

      data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        const x1 = 100 + radius * Math.cos(currentAngle);
        const y1 = 100 + radius * Math.sin(currentAngle);
        const x2 = 100 + radius * Math.cos(currentAngle + sliceAngle);
        const y2 = 100 + radius * Math.sin(currentAngle + sliceAngle);

        const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

        const pathData = [
          `M 100 100`,
          `L ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
          `Z`
        ].join(" ");

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", item.color);

        chart.appendChild(path);

        currentAngle += sliceAngle;
      });

      document.getElementById(elementId).appendChild(chart);
    }

    function createLabels(containerId, data) {
      const container = document.getElementById(containerId);
      data.forEach((item) => {
        const labelItem = document.createElement("div");
        labelItem.className = "label-item";

        const colorBox = document.createElement("span");
        colorBox.className = "label-color";
        colorBox.style.backgroundColor = item.color;

        const text = document.createElement("span");
        text.textContent = `${item.label} : ${item.value}`;

        labelItem.appendChild(colorBox);
        labelItem.appendChild(text);
        container.appendChild(labelItem);
      });
    }

    const jobsData = [
      { label: 'Total Jobs', value: 100, color: '#4154F1' },
      { label: 'Pending Quote', value: 10, color: '#FFD0C3' },
      { label: 'Schedule', value: 20, color: '#87EFAC' }
    ];
    const tradersData = [
      { label: 'Total Traders', value: 100, color: '#4154F1' },
      { label: 'Gase complaice', value: 10, color: '#FFD0C3' },
      { label: 'Cleaning', value: 20, color: '#87EFAC' }
    ];

    drawPieChart('piechart1', jobsData);
    createLabels('labels1', jobsData);

    drawPieChart('piechart2', tradersData);
    createLabels('labels2', tradersData);