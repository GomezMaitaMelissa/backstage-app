import {
  createBaseThemeOptions,
  createUnifiedTheme,
  palettes,
} from '@backstage/theme';

export const newTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light,
    },
  }),

  components: {
    BackstageHeader: {
      styleOverrides: {
        header: () => ({
          // fontFamily: 'monospace',
          backgroundColor: '#124116',
          backgroundImage: 'none',
        }),
        title: () => ({
          // fontFamily: 'monospace',
        }),
        subtitle: () => ({
          fontFamily: 'monospace',
        }),
      },
    },

    BackstageSignInPage: {
      styleOverrides: {
        container: () => ({
          justifyContent: 'center',
        }),
      },
    },

    BackstageInfoCard: {
      styleOverrides: {
        header: () => ({
          color: '#FFFFFF',
          backgroundColor: '#00A94F',
          border: 'none',
          fontFamily: 'monospace',
        }),
        headerTitle: () => ({
          fontFamily: 'monospace',
          color: '#FFFFFF',
        }),
        headerSubheader: () => ({
          fontFamily: 'monospace',
          color: '#FFFFFF',
        }),
      },
    },

    MuiButton: {
      styleOverrides: {
        outlinedPrimary: () => ({
          color: '#FFFFFF',
          backgroundColor: '#00A94F',
          border: 'none',
          fontFamily: 'monospace',
          '&:hover': {
            color: '#00A94F',
            border: '1px solid #00A94F',
          },
        }),

        containedPrimary: () => ({
          color: '#FFFFFF',
          backgroundColor: '#00A94F',
          border: 'none',
          fontFamily: 'monospace',
          '&:hover': {
            color: '#00A94F',
            border: '1px solid #00A94F',
            backgroundColor: '#FFFFFF',
          },
        }),
      },
    },

    BackstageSidebar: {
      styleOverrides: {
        drawer: () => ({
          background: '#00A94F',
        })
      },
    },

    BackstageSidebarItem: {
      styleOverrides: {
        label: () => ({
          color: '#FFFFFF',
          fontFamily: 'monospace',
        }),
        highlightable: () => ({
          '&:hover': {
            background: '#124116',
          },
        }),
        selected: () => ({
          '&:hover': {
            borderLeftColor: '#FFFFFF',
          },
        })
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: () => ({
          color: '#00A94F',
          backgroundColor: 'white',
          borderRadius: '4px',
        }),
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: () => ({
          fontFamily: 'arial',
          color: '#00A94F',
        }),
        h5: () => ({
          color: 'black',
        }),
        h6: () => ({
          fontFamily: 'monospace',
          color: '#FFFFFF',
        }),
        subtitle2: () => ({
          fontFamily: 'monospace',
          color: '#FFFFFF',
        }),
        button: () => ({
          color: 'black',
          fontWeight: 'bold',
          fontSize: '0.8rem',
        }),
      },
    },

    MuiGrid: {
      styleOverrides: {
        root: () => ({
          padding: '20px 10px 0px 0px',
        }),
        item: () => ({
          color: '#00A94F',
        }),
        "spacing-xs-3": () => ({
          margin: '-50px 0px 0px 10px',
        }),
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: () => ({
          color: '#00A94F',
        }),
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: () => ({
          color: '#00A94F',
        }),
      },
    },

    BackstageTable: {
      styleOverrides: {
        root: () => ({
          padding: '20px 0px 0px 0px',
          width: '100%',
        }),
      },
    },

    MuiTable: {
      styleOverrides: {
        root: () => ({
          width: '98%',
          margin: '0px 12px 10px 12px',
        }),
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: () => ({
          width: '100%',
          padding: '12px 5px 2px 5px',
          overflowX: 'hidden' ,
        }),
      },
    },

    BackstageTableHeader: {
      styleOverrides: {
        header: () => ({
          color: 'white',
          backgroundColor: '#83bd92',
          borderBottom: '2px solid #3a4f45',
          borderTop: '2px solid #3a4f45',
          fontFamily: 'monospace',
          textShadow: '2px 2px 4px #3a4f45',
        }),
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: () => ({
          borderCollapse: 'collapse',
          borderBottom: '1px solid #3a4f45',
          borderTop: '1px solid #3a4f45',
          borderRight: '1px solid #3a4f45',
          borderLeft: '1px solid #3a4f45',
        }),
        head: () => ({
          color: 'white',
          fontFamily: 'monospace',
          textShadow: '2px 2px 4px #3a4f45',
          backgroundColor: '#83bd92',
        }),
      },
    },

    MuiTableSortLabel: {
      styleOverrides: {
        root: () => ({
          fontFamily: 'monospace',
          color: 'white',
        }),
      },
    },
  },
})