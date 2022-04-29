// @flow
/* eslint react/jsx-one-expression-per-line: 0 */  // the &nbsp; in the html breaks this
import { Component } from 'react';
import type { Node } from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import Dialog from '../../../widgets/Dialog';
import DialogCloseButton from '../../../widgets/DialogCloseButton';
import styles from './AddNFTDialog.scss';
import type { $npm$ReactIntl$IntlFormat } from 'react-intl';
import {
  MultiToken,
} from '../../../../api/common/lib/MultiToken';
import SearchIcon from '../../../../assets/images/assets-page/search.inline.svg';
import NoItemsFoundImg from '../../../../assets/images/dapp-connector/no-websites-connected.inline.svg'
import NoNFT from '../../../../assets/images/nft-no.inline.svg'
import { FormattedNFTDisplay, getNFTs } from '../../../../utils/wallet'
import BigNumber from 'bignumber.js'
import type {
  TokenLookupKey,
} from '../../../../api/common/lib/MultiToken';
import type { TokenRow } from '../../../../api/ada/lib/storage/database/primitives/tables';
import type { UriParams } from '../../../../utils/URIHandling';

type Props = {|
  +onClose: void => void,
  +spendableBalance: ?MultiToken,
  +classicTheme: boolean,
  +getTokenInfo: $ReadOnly<Inexact<TokenLookupKey>> => $ReadOnly<TokenRow>,
  +updateAmount: (?BigNumber) => void,
  +uriParams: ?UriParams,
  +selectedToken: void | $ReadOnly<TokenRow>,
  +validateAmount: (
    amountInNaturalUnits: BigNumber,
    tokenRow: $ReadOnly<TokenRow>,
  ) => Promise<[boolean, void | string]>,
  +defaultToken: $ReadOnly<TokenRow>,
|};

type State = {|
  currentNftsList: FormattedNFTDisplay[],
  fullNftsList: FormattedNFTDisplay[],
|}



export const messages: Object = defineMessages({
  nameAndTicker: {
    id: 'wallet.assets.nameAndTicker',
    defaultMessage: '!!!Name and ticker',
  },
  quantity: {
    id: 'wallet.assets.quantity',
    defaultMessage: '!!!Quantity',
  },
  identifier: {
    id: 'wallet.assets.fingerprint',
    defaultMessage: '!!!Fingerprint',
  },
  search: {
    id: 'wallet.assets.search',
    defaultMessage: '!!!Search',
  },
  noAssetFound: {
    id: 'wallet.assets.noAssetFound',
    defaultMessage: '!!!No Asset Found',
  },
  noTokensYet: {
    id: 'wallet.send.form.dialog.noTokensYet',
    defaultMessage: '!!!There are no tokens in your wallet yet'
  },
  minAda: {
    id: 'wallet.send.form.dialog.minAda',
    defaultMessage: '!!!min-ada'
  },
  add: {
    id: 'wallet.send.form.dialog.add',
    defaultMessage: '!!!add'
  },
  nNft: {
    id: 'wallet.send.form.dialog.nNft',
    defaultMessage: '!!!NFT ({number})',
  },
});

@observer
export default class AddNFTDialog extends Component<Props, State> {

  static contextTypes: {|intl: $npm$ReactIntl$IntlFormat|} = {
    intl: intlShape.isRequired,
  };

  componentDidMount(): void {
    const { spendableBalance, getTokenInfo } = this.props;
    const nftsList = getNFTs(spendableBalance, getTokenInfo)
    this.setState({ fullNftsList: nftsList,  currentNftsList: nftsList })
  }


  state: State = {
    currentNftsList: [],
    fullNftsList: []
  };

  search: ((e: SyntheticEvent<HTMLInputElement>) => void) =
    (event: SyntheticEvent<HTMLInputElement>) => {
      const keyword = event.currentTarget.value
      this.setState((prev) => ({ currentNftsList: prev.fullNftsList }))
      if(!keyword) return
      const regExp = new RegExp(keyword, 'gi')
      const nftsListCopy = [...this.state.fullNftsList]
      const filteredNftsList = nftsListCopy.filter(a => a.name.match(regExp))
      this.setState({ currentNftsList: filteredNftsList })
    };

  render(): Node {
    const { intl } = this.context;
    const { onClose } = this.props
    const { currentNftsList, fullNftsList } = this.state

    return (
      <Dialog
        title={intl.formatMessage(messages.nNft, { number: fullNftsList.length })}
        closeOnOverlayClick={false}
        className={styles.dialog}
        onClose={onClose}
        closeButton={<DialogCloseButton />}
      >
        <div className={styles.component}>
          <div className={styles.search}>
            <SearchIcon />
            <input onChange={this.search} className={styles.searchInput} type="text" placeholder={intl.formatMessage(messages.search)} />
          </div>
          <div className={styles.minAda}>
            <p><span className={styles.minAdaLabel}>{intl.formatMessage(messages.minAda)}{':'}</span> {0}</p>
          </div>
          {
            currentNftsList.length === 0 ? (
              <div className={styles.noAssetFound}>
                <NoItemsFoundImg />
                <h1 className={styles.text}>
                  {intl.formatMessage(
                    fullNftsList.length === 0 ? messages.noTokensYet : messages.noAssetFound
                  )}
                </h1>
              </div>
            ): (
              <>
                <div className={styles.nftsGrid}>
                  {
                    currentNftsList.map(nft => {
                      const image = nft.image != null ? nft.image.replace('ipfs://', '') : '';

                      return (
                        <div className={styles.nftCard}>
                          {image ? <img src={`https://ipfs.io/ipfs/${image}`} alt={nft.name} loading="lazy" /> : <NoNFT /> }
                          <p className={styles.nftName}>{nft.name }</p>
                        </div>
                      )
                    })
                  }
                </div>
              </>
            )
          }

          <button type='button' className={styles.add}>{intl.formatMessage(messages.add)}</button>
        </div>
      </Dialog>
    );
  }
}
