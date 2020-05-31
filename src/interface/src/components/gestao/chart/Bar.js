import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data() {
    return {
      info: {
        labels: [],
        datasets: [
          {
            label: "GET",
            backgroundColor: "#aed987",
            data: []
          },
          {
            label: "POST",
            backgroundColor: "#05CBE1",
            data: []
          },
          {
            label: "PUT",
            backgroundColor: "#ffa31a",
            data: []
          },
          {
            label: "DELETE",
            backgroundColor: "#ff0000",
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    this.$request("get", "/stats")
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          if (
            res.data[i]._id != "" &&
            res.data[i]._id != "unknown route" &&
            res.data[i]._id != "/stats" &&
            res.data[i]._id != "/chaves"
          ) {
            // alert(JSON.stringify(res.data[i]))
            this.info.labels.push(res.data[i]._id);
            var index = this.info.labels.indexOf(res.data[i]._id);
            this.info.datasets[0].data[index] = res.data[i].nCallsGet;
            this.info.datasets[1].data[index] = res.data[i].nCallsPost;
            this.info.datasets[2].data[index] = res.data[i].nCallsPut;
            this.info.datasets[3].data[index] = res.data[i].nCallsDelete;
          }
        }
        this.renderChart(this.info, this.options);
      })
      .catch(error => alert(error));
  }
};
