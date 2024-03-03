import { Box, Button, Stack, Typography, Paper } from "@mui/material";

import { Game } from "../../nonview/core";

const CORRECT_COLORS = ["#0c84", "#cc04", "#c804", "#8004"];

function AnswerView({ answer, onSelectAnswer, selectedAnswers }) {
  const onClick = function () {
    onSelectAnswer(answer);
  };
  const isSelected = selectedAnswers.includes(answer);
  const colorBack = isSelected ? "#5a594e" : "#efefe6";
  const colorFore = isSelected ? "#ffffff" : "#000000";
  return (
    <Button
      sx={{
        m: 1,
        p: 1,
        width: 140,
        color: colorFore,
        background: colorBack,
        fontWeight: "bold",
      }}
      onClick={onClick}
    >
      {answer}
    </Button>
  );
}

function CorrectGroupView({ game, groupName, iGroup }) {
  const answers = game.groupToAnswers[groupName];
  const text = answers.join(", ") + " are all parts of " + groupName + ".";
  const color = CORRECT_COLORS[iGroup % CORRECT_COLORS.length];
  return (
    <Paper sx={{ background: color, m: 1, p: 1 }}>
      <Typography variant="h6">{text}</Typography>
    </Paper>
  );
}

function CorrectGroupsView({ game }) {
  return (
    <Box>
      {game.correctGroupNames.map(function (groupName, iGroup) {
        return (
          <CorrectGroupView
            key={groupName}
            iGroup={iGroup}
            game={game}
            groupName={groupName}
          />
        );
      })}
    </Box>
  );
}

function IncompleteAnswersView({ game, selectedAnswers, onSelectAnswer }) {
  const n = game.incompleteGroupNames.length;

  let inner = [];
  for (let i = 0; i < n; i++) {
    let innerInner = [];
    for (let j = 0; j < Game.GROUP_SIZE; j++) {
      const k = i * Game.GROUP_SIZE + j;
      innerInner.push(
        <AnswerView
          key={k}
          answer={game.incompleteAnswersShuffled[k]}
          selectedAnswers={selectedAnswers}
          onSelectAnswer={onSelectAnswer}
        />
      );
    }
    inner.push(<Stack direction="row">{innerInner}</Stack>);
  }
  return <Box>{inner}</Box>;
}

export default function GameView({ game, selectedAnswers, onSelectAnswer }) {
  return (
    <Box sx={{ m: 1, p: 1 }}>
      <CorrectGroupsView game={game} />
      <IncompleteAnswersView
        game={game}
        selectedAnswers={selectedAnswers}
        onSelectAnswer={onSelectAnswer}
      />
    </Box>
  );
}
