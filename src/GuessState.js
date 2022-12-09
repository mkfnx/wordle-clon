class GuessState {
    static NotContained = new GuessState("notContained")
    static Contained = new GuessState("contained")
    static Matched = new GuessState("matched")
  
    constructor(name) {
      this.name = name
    }
  }

  export default GuessState;