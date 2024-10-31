import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

export * from './CustomEntityFilter';
export * from './LikeEntityFilter';
export * from './TypographyLink';

export const TypographyLink = ({
  text,
  icon,
}: {
  text?: string;
  icon: any;
}) => {
  const useStylesNoPadding = makeStyles({
    noPadding: {
      paddingTop: 0, // Quitar el padding
    },
  });
  const classesNoPadding = useStylesNoPadding();
  const useStylesGrid = makeStyles(theme => ({
    root: {
      padding: theme.spacing(0),
      flexWrap: 'nowrap',
      alignItems: 'center',
    },
  }));
  const classesGrid = useStylesGrid();
  const useStylesText = makeStyles(theme => ({
    root: {
      ...theme.typography.button,
      padding: theme.spacing(0),
      fontWeight: 700,
      textTransform: 'unset',
    },
  }));
  const classesText = useStylesText();

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="baseline"
      className={classesGrid.root}
      spacing={1}
    >
      <Grid className={classesNoPadding.noPadding}>{icon}</Grid>
      <Grid className={classesNoPadding.noPadding}>
        <div className={classesText.root}>{text}</div>
      </Grid>
    </Grid>
  );
};
