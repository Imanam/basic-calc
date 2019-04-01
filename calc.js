/* jshint esversion: 6 */

var app = new Vue({
  el: "#vue-app",
  data: {
    result: "",
    accumulator_1: 0.0,
    accumulator_2: 0.0,
    operation: ""
  },
  methods: {
    // button events
    one() {
      this.avoidsLeadingZero();
      this.result += "1";
      this.update_acc_2();
    },
    two() {
      this.avoidsLeadingZero();
      this.result += "2";
      this.update_acc_2();
    },
    clear() {
      this.result = "0";
      this.accumulator_1 = this.accumulator_2 = 0.0;
    },
    plus() {
      this.accumulator_1 = this.accumulator_2;
      console.log(`acc1: ${this.accumulator_1}`);
      this.operation = "+";
      this.result="0";
      this.update_acc_2();
    },
    equal() {
      switch(this.operation) {
        case "+":
         console.log(`acc1: ${this.accumulator_1}`);
         this.accumulator_2 += this.accumulator_1;
         console.log(`acc2: ${this.accumulator_2}`);
         this.result = this.accumulator_2.toString();
         this.accumulator_1 = 0.0;
         break;
        default:
         this.accumulator_1 = 0.0;
         this.result = this.accumulator_2.ToString();
         break;
      }
    },
    // helpers
    update_acc_2() {
      this.accumulator_2 = parseFloat(this.result);
      console.log(`acc2: ${this.accumulator_2}`);
    },
    avoidsLeadingZero() {
      if(this.result==="0") {
        this.result="";
      }
    }
  }
})