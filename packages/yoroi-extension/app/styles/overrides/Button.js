// @flow
import { revampBaseTheme } from '../themes/revamp-base-theme';

const ClassicButton: any = {
  styleOverrides: {
    root: {
      fontSize: '0.875rem',
      borderRadius: 0,
      border: 0,
      fontWeight: 500,
      minHeight: 44,
      minWidth: 230,
      padding: '12px 20px',
      textTransform: 'none',
    },
  },
  defaultProps: { disableRipple: true },
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        backgroundColor: 'var(--yoroi-comp-button-primary-background)',
        color: 'var(--yoroi-comp-button-primary-text)',
        ':hover': {
          backgroundColor: 'var(--yoroi-comp-button-primary-background-hover)',
        },
        '&.Mui-active': {
          backgroundColor: 'var(--yoroi-comp-button-primary-background-active)',
        },
        '&.Mui-disabled': {
          opacity: 0.4,
          color: 'var(--yoroi-comp-button-primary-text)',
        },
        '& .MuiLoadingButton-loadingIndicator': {
          color: 'var(--yoroi-comp-button-primary-text)',
        },
      },
    },
    {
      props: { variant: 'secondary' },
      style: {
        backgroundColor: 'var(--yoroi-comp-button-flat-background)',
        color: 'var(--yoroi-comp-button-flat-text)',
        border: 0,
        ':hover': {
          backgroundColor: 'var(--yoroi-comp-button-flat-background-hover)',
        },
        '&.Mui-active': {
          backgroundColor: 'var(--yoroi-comp-button-flat-background-active)',
        },
        '&.Mui-disabled': {
          color: 'var(--yoroi-comp-button-flat-text)',
          opacity: 0.4,
        },
        '& .MuiLoadingButton-loadingIndicator': {
          color: 'var(--yoroi-comp-button-flat-text)',
        },
      },
    },
    {
      props: { variant: 'danger' },
      style: {
        backgroundColor: 'var(--yoroi-comp-button-danger-background)',
        color: 'var(--yoroi-comp-button-danger-text)',
        border: 0,
        ':hover': {
          backgroundColor: 'var(--yoroi-comp-button-danger-background-hover)',
        },
        '&.Mui-active': {
          backgroundColor: 'var(--yoroi-comp-button-danger-background-active)',
        },
        '&.Mui-disabled': {
          opacity: 0.4,
          color: 'var(--yoroi-comp-button-danger-text)',
        },
        '& .MuiLoadingButton-loadingIndicator': {
          color: 'var(--yoroi-comp-button-danger-background)',
        },
      },
    },
  ],
};

const ModernButton: any = {
  styleOverrides: {
    root: {
      fontSize: '1rem',
      borderRadius: 8,
      fontWeight: 500,
      fontFamily: 'Rubik',
      minHeight: 52,
      minWidth: 230,
      lineHeight: '18px',
      textTransform: 'uppercase',
      padding: '16px',
      height: 52,
    },
  },
  defaultProps: { disableRipple: true },
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        backgroundColor: 'var(--yoroi-comp-button-primary-background)',
        color: 'var(--yoroi-comp-button-primary-text)',
        ':hover': {
          backgroundColor: 'var(--yoroi-comp-button-primary-background-hover)',
        },
        '&.Mui-active': {
          backgroundColor: 'var(--yoroi-comp-button-primary-background-active)',
        },
        '&.Mui-disabled': {
          opacity: 0.4,
          color: 'var(--yoroi-comp-button-primary-text)',
        },
        '& .MuiLoadingButton-loadingIndicator': {
          color: 'var(--yoroi-comp-button-primary-text)',
        },
      },
    },
    {
      props: { variant: 'secondary-blue' },
      style: {
        backgroundColor: 'var(--yoroi-comp-button-secondary-background)',
        color: 'var(--yoroi-comp-button-primary-text)',
        border: '2px solid',
        borderColor: 'var(--yoroi-comp-button-primary-border)',
        ':hover': {
          color: 'var(--yoroi-comp-button-primary-text)',
          borderColor: 'var(--yoroi-comp-button-primary-border-hover)',
          backgroundColor: 'var(--yoroi-comp-button-primary-background-hover)',
        },
        '&.Mui-active': {
          backgroundColor: 'var(--yoroi-comp-button-primary-background-active)',
        },
        '&.Mui-disabled': {
          border: '2px solid',
          opacity: 0.4,
          borderColor: 'var(--yoroi-comp-button-primary-border)',
          color: 'var(--yoroi-comp-button-primary-text)',
        },
        '& .MuiLoadingButton-loadingIndicator': {
          color: 'var(--yoroi-comp-button-primary-text)',
        },
      },
    },
    {
      props: { variant: 'secondary' },
      style: {
        backgroundColor: 'var(--yoroi-comp-button-secondary-background)',
        color: 'var(--yoroi-comp-button-secondary-text)',
        border: '2px solid',
        borderColor: 'var(--yoroi-comp-button-secondary-border)',
        ':hover': {
          color: 'var(--yoroi-comp-button-secondary-text)',
          borderColor: 'var(--yoroi-comp-button-secondary-border-hover)',
          backgroundColor: 'var(--yoroi-comp-button-secondary-background-hover)',
        },
        '&.Mui-active': {
          backgroundColor: 'var(--yoroi-comp-button-secondary-background-active)',
        },
        '&.Mui-disabled': {
          border: '2px solid',
          opacity: 0.4,
          borderColor: 'var(--yoroi-comp-button-secondary-border)',
          color: 'var(--yoroi-comp-button-secondary-text)',
        },
        '& .MuiLoadingButton-loadingIndicator': {
          color: 'var(--yoroi-comp-button-secondary-text)',
        },
      },
    },
    {
      props: { variant: 'ternary' },
      style: {
        minWidth: '160px',
        minHeight: '44px',
        height: '44px',
        fontSize: '0.875rem',
        backgroundColor: 'transparent',
        color: 'var(--yoroi-palette-gray-600)',
        border: '1px solid',
        borderColor: 'var(--yoroi-palette-gray-400)',
        ':hover': {
          borderColor: 'var(--yoroi-palette-gray-500)',
        },
        '&.Mui-active': {
          backgroundColor: 'var(--yoroi-palette-gray-50)',
        },
        '&.Mui-disabled': {
          border: '1px solid',
          opacity: 0.4,
          borderColor: 'var(--yoroi-palette-gray-400)',
          color: 'var(--yoroi-palette-gray-600)',
        },
        '& .MuiLoadingButton-loadingIndicator': {
          color: 'var(--yoroi-palette-gray-600)',
        },
      },
    },
    {
      props: { variant: 'danger' },
      style: {
        backgroundColor: 'var(--yoroi-comp-button-danger-background)',
        color: 'var(--yoroi-comp-button-danger-text)',
        border: 0,
        ':hover': {
          backgroundColor: 'var(--yoroi-comp-button-danger-background-hover)',
        },
        '&.Mui-active': {
          backgroundColor: 'var(--yoroi-comp-button-danger-background-active)',
        },
        '&.Mui-disabled': {
          color: 'var(--yoroi-comp-button-danger-text)',
          opacity: 0.4,
        },
        '& .MuiLoadingButton-loadingIndicator': {
          color: 'var(--yoroi-comp-button-danger-background)',
        },
      },
    },
    // Todo: this button `varient` should be part of the new revam design system
    {
      props: { variant: 'rv-primary' },
      style: {
        minWidth: 'unset',
        minHeight: 'unset',
        width: 'unset',
        height: 'unset',
        // Todo: get the colors from the design system
        backgroundColor: '#4B6DDE',
        color: 'var(--yoroi-palette-common-white)',
        border: 1,
        ':hover': {
          backgroundColor: '#3154CB',
        },
        '&.Mui-active': {
          backgroundColor: '#1737A3',
        },
        '&.Mui-disabled': {
          color: '#C4CFF5',
          opacity: 0.4,
        },
        '& .MuiLoadingButton-loadingIndicator': {
          color: '#C4CFF5',
        },
      },
    },
  ],
};

function makeContainedBtnStyles(color: 'primary' | 'secondary'): Object {
  return {
    backgroundColor: revampBaseTheme.palette[color].main,
    color: revampBaseTheme.palette.common.white,
    ':hover': {
      backgroundColor: revampBaseTheme.palette[color][600],
    },
    ':active': {
      backgroundColor: revampBaseTheme.palette[color][700],
    },
    ':focus': {
      backgroundColor: revampBaseTheme.palette[color][500],
    },
    '&.Mui-disabled': {
      color: revampBaseTheme.palette.common.white,
      backgroundColor: revampBaseTheme.palette[color][200],
    },
    '& .MuiLoadingButton-loadingIndicator': {
      color: revampBaseTheme.palette.common.white,
    },
  };
}

function makeOutlinedBtnStyles(color: 'primary' | 'secondary'): Object {
  return {
    backgroundColor: 'transparent',
    color: revampBaseTheme.palette[color][500],
    border: '2px solid',
    borderColor: revampBaseTheme.palette[color][500],
    ':hover': {
      border: '2px solid',
      color: revampBaseTheme.palette[color][600],
      borderColor: revampBaseTheme.palette[color][600],
    },
    ':active': {
      borderColor: revampBaseTheme.palette[color][700],
    },
    ':focus': {
      borderColor: revampBaseTheme.palette[color][500],
    },
    '&.Mui-disabled': {
      border: '2px solid',
      borderColor: revampBaseTheme.palette[color][200],
      color: revampBaseTheme.palette[color][200],
    },
    '& .MuiLoadingButton-loadingIndicator': {
      color: revampBaseTheme.palette[color][600],
    },
  };
}

// Button in Figam: https://bit.ly/3Ky4uvo
const RevampButton: any = {
  styleOverrides: {
    root: {
      fontSize: '1rem',
      borderRadius: 8,
      fontWeight: 500,
      fontFamily: 'Rubik',
      lineHeight: '19px',
      textTransform: 'uppercase',
      padding: '16px',
      '&.MuiButton-sizeLarge': {
        height: '56px',
      },
      '&.MuiButton-sizeMedium': {
        padding: '10px',
        height: '48px',
      },
      '&.MuiButton-sizeSmall': {
        padding: '7px',
        height: '32px',
      },
      boxShadow: 'none',
      ':hover': {
        boxShadow: 'none',
      },
    },
  },
  defaultProps: { disableRipple: false },
  variants: [
    {
      props: { variant: 'contained', color: 'primary' },
      style: makeContainedBtnStyles('primary'),
    },
    {
      props: { variant: 'contained', color: 'secondary' },
      style: makeContainedBtnStyles('secondary'),
    },
    {
      props: { variant: 'outlined', color: 'primary' },
      style: makeOutlinedBtnStyles('primary'),
    },
    {
      props: { variant: 'outlined', color: 'secondary' },
      style: makeOutlinedBtnStyles('secondary'),
    },
    {
      props: { variant: 'ternary' },
      style: {
        width: '160px',
        height: '48px',
        padding: '8px',
        fontSize: '0.875rem',
        backgroundColor: 'transparent',
        color: revampBaseTheme.palette.gray[600],
        border: '1px solid',
        borderColor: revampBaseTheme.palette.gray[400],
        ':hover': {
          borderColor: revampBaseTheme.palette.gray[500],
        },
        '&.Mui-active': {
          backgroundColor: revampBaseTheme.palette.gray[50],
        },
        '&.Mui-disabled': {
          border: '1px solid',
          opacity: 0.4,
          borderColor: revampBaseTheme.palette.gray[400],
          color: revampBaseTheme.palette.gray[600],
        },
        '& .MuiLoadingButton-loadingIndicator': {
          color: revampBaseTheme.palette.gray[600],
        },
      },
    },
    {
      props: { variant: 'contained', color: 'error' },
      style: {
        backgroundColor: revampBaseTheme.palette.error[200],
        color: revampBaseTheme.palette.common.white,
        border: 0,
        ':hover': {
          backgroundColor: revampBaseTheme.palette.error[100],
        },
        '&.Mui-active': {
          backgroundColor: revampBaseTheme.palette.error[200],
        },
        '&.Mui-disabled': {
          backgroundColor: revampBaseTheme.palette.error[200],
          color: revampBaseTheme.palette.common.white,
          opacity: 0.4,
        },
        '& .MuiLoadingButton-loadingIndicator': {
          color: revampBaseTheme.palette.error[200],
        },
      },
    },
    {
      props: { variant: 'outlined', color: 'error' },
      style: {
        backgroundColor: revampBaseTheme.palette.common.white,
        color: revampBaseTheme.palette.error[500],
        border: '2px solid',
        borderColor: revampBaseTheme.palette.error[500],
        ':hover': {
          border: '2px solid',
          color: revampBaseTheme.palette.error[400],
          borderColor: revampBaseTheme.palette.error[400],
        },
        ':active': {
          borderColor: revampBaseTheme.palette.error[400],
        },
        ':focus': {
          borderColor: revampBaseTheme.palette.error[400],
        },
        '&.Mui-disabled': {
          border: '2px solid',
          opacity: 0.4,
        },
        '& .MuiLoadingButton-loadingIndicator': {
          color: revampBaseTheme.palette.error[500],
        },
      },
    },
  ],
};

export { ClassicButton, ModernButton, RevampButton };
