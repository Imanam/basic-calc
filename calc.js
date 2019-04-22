/* jshint esversion: 6 */

var app = new Vue({
  el: "#vue-app",
  data: {
    result: "0",
    accumulator_1: 0.0, // first operand
    accumulator_2: 0.0, // second operand
    operation: "",
    digitCanAccumulate: true, // when true, indicates next digit should accumulate in result string
    resultDisplayNeedsRefresh: false
  },
  methods: {
    //
    // button events
    //

    dot(event) {
      if (this.digitCanAccumulate) {
        const dot = /[.]/g;
        const dotCheck = this.result.search(dot);
        if (dotCheck === -1) {
          this.result += event.target.innerHTML; // to illustrate how we can get contents
          this.updateAcc2();
        }
      }
    },

    clear() {
      this.result = "0";
      this.accumulator_1 = this.accumulator_2 = 0.0;
      this.digitCanAccumulate = true;
    },

    addOperator(event) {
      this.equal();
      this.accumulator_1 = this.accumulator_2;
      this.operation = event.target.innerHTML;
      this.digitCanAccumulate = false;
      this.updateAcc2();
    },

    plusMinus() {
      this.result = parseFloat(this.result);
      if (this.result > 0) {
        this.result = -this.result;
      } else if (this.result < 0) {
        this.result = Math.abs(this.result);
      }
      this.result = this.result.toString();
      this.updateAcc2();
    },

    equal() {
      switch (this.operation) {
        case "+":
          this.accumulator_2 += this.accumulator_1;
          break;

        case "-":
          this.accumulator_2 = this.accumulator_1 - this.accumulator_2;
          break;

        case "\u00D7": // times
          this.accumulator_2 *= this.accumulator_1;
          break;

        case "\u00F7": // divide
          this.accumulator_2 = this.accumulator_1 / this.accumulator_2;
          break;
      }
      this.result = this.accumulator_2.toString();
      this.accumulator_1 = 0.0;
      this.digitCanAccumulate = false;
      this.operation = "";
    },

    addDigit: function(event) {
      if (this.digitCanAccumulate === false) {
        this.accumulator_2 = 0.0;
        this.result = this.accumulator_2.toString();
        this.digitCanAccumulate = true;
      }
      this.avoidsLeadingZero();
      this.result += event.target.innerHTML;
      this.updateAcc2();
    },

    //
    // helpers
    //
    updateAcc2() {
      this.accumulator_2 = parseFloat(this.result);
    },

    // clears result if "0" in order to avoid "01" displayed, for example
    avoidsLeadingZero() {
      if (this.result === "0") {
        this.result = "";
      }
    }
  },

  computed: {
    // associated to v-model (double way binding with input)
    displayResult: {
      get: function() {
        // the flag below is a trick to force a refresh in v-model even if result was not changed
        if (this.resultDisplayNeedsRefresh) {
          this.resultDisplayNeedsRefresh = false;
        }
        return this.result;
      },
      // this setter is called when something changed in the input
      set: function(v) {
        const vTrimmed = v.trim();
        const pattern = /^[+,-]?([1-9]\d*|0)(\.\d+ | [.])?$/;
        if (pattern.test(vTrimmed) === true) {
          this.result = vtrim;
        } else {
          this.resultDisplayNeedsRefresh = true; // this flag will trigger a refresh in this computed property
        }
        this.update_acc_2();
      }
    }
  }
});
