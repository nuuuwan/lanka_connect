import { Component } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Game } from "../../nonview/core";
import { GameView } from "../molecules";
import { CircularProgress } from "@mui/material";

export default class HomePage extends Component {
  static MAX_MISTAKES = 4;
  static EMOJI_CHANCES = "⚫";
  constructor(props) {
    super(props);
    this.state = { game: undefined, selectedAnswers: [], nMistakes: 0 };
  }

  async componentDidMount() {
    const game = Game.random();
    game.shuffle();
    this.setState({ game });
  }

  onSelectAnswer(answer) {
    let { selectedAnswers } = this.state;
    if (selectedAnswers.includes(answer)) {
      selectedAnswers = selectedAnswers.filter((a) => a !== answer);
    } else if (selectedAnswers.length < Game.GROUP_SIZE) {
      selectedAnswers.push(answer);
    }
    this.setState({ selectedAnswers });
  }

  onShuffle() {
    const { game } = this.state;
    game.shuffle();
    this.setState({ game });
  }

  onSubmit() {
    let { game, selectedAnswers, nMistakes } = this.state;
    const isCorrect = game.submit(selectedAnswers);
    if (!isCorrect) {
      nMistakes += 1;
    } else {
      selectedAnswers = [];
      game.shuffle();
    }
    this.setState({ nMistakes, game, selectedAnswers });
  }

  onDeselectAll() {
    this.setState({ selectedAnswers: [] });
  }

  renderButtons() {
    const { selectedAnswers } = this.state;
    const disableSubmit = selectedAnswers.length !== Game.GROUP_SIZE;
    return (
      <Stack direction="row" sx={{ margin: "auto" }}>
        <Button onClick={this.onShuffle.bind(this)}>Shuffle</Button>
        <Button onClick={this.onDeselectAll.bind(this)}>Deselect all</Button>
        <Button onClick={this.onSubmit.bind(this)} disabled={disableSubmit}>
          Submit
        </Button>
      </Stack>
    );
  }

  renderMistakesRemaining() {
    const { nMistakes } = this.state;
    const nMistakesRemaining = HomePage.MAX_MISTAKES - nMistakes;
    return (
      <Box>
        <Typography variant="body2">
          Mistakes remaining:{" "}
          {HomePage.EMOJI_CHANCES.repeat(nMistakesRemaining)}
        </Typography>
      </Box>
    );
  }

  render() {
    const { game, selectedAnswers } = this.state;
    if (!game) {
      return <CircularProgress />;
    }
    return (
      <Box sx={{ m: 2, p: 2, textAlign: "center" }}>
        <Typography variant="body2">Create four groups of four!</Typography>
        <GameView
          game={game}
          selectedAnswers={selectedAnswers}
          onSelectAnswer={this.onSelectAnswer.bind(this)}
        />
        {this.renderMistakesRemaining()}
        {this.renderButtons()}
      </Box>
    );
  }
}
