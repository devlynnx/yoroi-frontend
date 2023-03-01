// @flow
import { useEffect, useState } from 'react';
import type { Node, ComponentType } from 'react';
import { defineMessages, injectIntl, FormattedHTMLMessage } from 'react-intl';
import { observer } from 'mobx-react';
import type { $npm$ReactIntl$IntlShape } from 'react-intl';
import { Stack, Typography, Box } from '@mui/material'
import StepController from './StepController';
import { CREATE_WALLET_SETPS } from './steps';
import HowToSaveRecoverPhraseTipsDialog from './HowToSaveRecoverPhraseTipsDialog';
import RecoveryPhrase from './RecoveryPhrase';
import { ReactComponent as InfoIcon }  from '../../../assets/images/info-icon-primary.inline.svg';

const messages: * = defineMessages({
  description: {
    id: 'wallet.create.secondStep.description',
    defaultMessage: '!!!Click <strong>“Show recovery phrase”</strong> below to reveal and keep it.',
  },
});

type Intl = {|
  intl: $npm$ReactIntl$IntlShape,
|};

type Props = {|
    setCurrentStep(step: string): void,
    recoveryPhrase: Array<string> | null,
|};

function SaveRecoveryPhraseStep(props: Props & Intl): Node {
  const { setCurrentStep, recoveryPhrase } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Stack alignItems='center' justifyContent='center'>
      <Stack direction='column' alignItems='left' justifyContent='center' maxWidth='700px'>
        <Stack mb='8px' flexDirection='row' alignItems='center' gap='6px'>
          <Typography>
            <FormattedHTMLMessage {...messages.description} />
          </Typography>
          <Box sx={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
            <InfoIcon />
          </Box>
        </Stack>

        {recoveryPhrase && <RecoveryPhrase recoveryPhrase={recoveryPhrase} />}

        <StepController
          goNext={() => setCurrentStep(CREATE_WALLET_SETPS.VERIFY_RECOVERY_PHRASE)}
          goBack={() => setCurrentStep(CREATE_WALLET_SETPS.LEARN_ABOUT_RECOVERY_PHRASE)}
        />
      </Stack>

      <HowToSaveRecoverPhraseTipsDialog
        open={!open} // Todo: undo this
        onClose={() => setOpen(false)}
      />
    </Stack>
  )
}

export default (injectIntl(observer(SaveRecoveryPhraseStep)) : ComponentType<Props>);