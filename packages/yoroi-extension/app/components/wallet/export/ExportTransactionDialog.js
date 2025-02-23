// @flow
import type { Node } from 'react';
import { Component } from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import LocalizableError from '../../../i18n/LocalizableError';
import type { $npm$ReactIntl$IntlFormat } from 'react-intl';
import type { TransactionRowsToExportRequest } from '../../../actions/common/transactions-actions';
import Dialog from '../../widgets/Dialog';
import DialogCloseButton from '../../widgets/DialogCloseButton';
import ErrorBlock from '../../widgets/ErrorBlock';
import globalMessages from '../../../i18n/global-messages';
import CheckboxLabel from '../../common/CheckboxLabel';
import DateRange from './DateRange';
import { Box } from '@mui/system';
import { Moment } from 'moment';

const messages = defineMessages({
  dialogTitle: {
    id: 'wallet.transaction.export.dialog.title',
    defaultMessage: '!!!Export transactions to file',
  },
  infoText1: {
    id: 'wallet.transaction.export.dialog.infoText1',
    defaultMessage:
      '!!!The entire transaction history within your wallet will be exported to a file',
  },
  includeTxIds: {
    id: 'wallet.transaction.export.dialog.includeTxIds',
    defaultMessage: '!!!Include Transaction IDs',
  },
});

type Props = {|
  +isActionProcessing: ?boolean,
  +error: ?LocalizableError,
  +submit: TransactionRowsToExportRequest => PossiblyAsync<void>,
  +toggleIncludeTxIds: void => void,
  +shouldIncludeTxIds: boolean,
  +cancel: void => void,
|};

type State = {|
  startDate: typeof Moment | null,
  endDate: typeof Moment | null,
|};

@observer
export default class ExportTransactionDialog extends Component<Props, State> {
  static contextTypes: {| intl: $npm$ReactIntl$IntlFormat |} = {
    intl: intlShape.isRequired,
  };

  state: State = {
    startDate: null,
    endDate: null,
  };

  componentWillUnmount() {
    const { toggleIncludeTxIds, shouldIncludeTxIds } = this.props;
    // Reset `includeTxIds` state
    if (shouldIncludeTxIds) toggleIncludeTxIds();
  }

  render(): Node {
    const { intl } = this.context;
    const {
      isActionProcessing,
      error,
      submit,
      cancel,
      toggleIncludeTxIds,
      shouldIncludeTxIds,
    } = this.props;
    const { startDate, endDate } = this.state;
    const infoBlock = (
      <Box
        sx={{
          fontWeight: 400,
          fontSize: '15px',
          lineHeight: 1.2,
          opacity: 0.7,
          textAlign: 'center',
          padding: '10px 0 0 0',
          mb: '25px',
        }}
      >
        <span>{intl.formatMessage(messages.infoText1)}</span>
      </Box>
    );

    const dialogActions = [
      {
        label: intl.formatMessage(globalMessages.exportButtonLabel),
        primary: true,
        isSubmitting: isActionProcessing || false,
        disabled:
          !startDate ||
          !endDate ||
          startDate.isAfter(endDate) ||
          !startDate.isValid() ||
          !endDate.isValid(),
        onClick: () => submit({ startDate, endDate }),
      },
    ];

    return (
      <Dialog
        className="ExportTransactionDialog"
        title={intl.formatMessage(messages.dialogTitle)}
        actions={dialogActions}
        closeOnOverlayClick={false}
        closeButton={<DialogCloseButton />}
        onClose={cancel}
      >
        {infoBlock}
        <DateRange
          date={{ startDate, endDate }}
          setStartDate={date => {
            this.setState({ startDate: date });
          }}
          setEndDate={date => {
            this.setState({ endDate: date });
          }}
        />
        <CheckboxLabel
          label={intl.formatMessage(messages.includeTxIds)}
          onChange={toggleIncludeTxIds}
          checked={shouldIncludeTxIds}
        />
        {error && <ErrorBlock error={error} />}
      </Dialog>
    );
  }
}
