// @flow
import { Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { Ports } from '../../scripts/connections';
import {
  backButton,
  confirmButton,
  createWalletBtn,
  getWalletBalance,
  getWalletNameAndPlate,
  getWallets,
  logoElement,
  noWalletsImg,
  selectWallet,
  spendingPasswordErrorField,
  spendingPasswordInput,
} from '../pages/connector-connectWalletPage';
import { disconnectWallet, getWalletsWithConnectedWebsites } from '../pages/connectedWebsitesPage';
import {
  getTransactionFee,
  detailsTabButton,
  getTransactionSentAmount,
  utxosTabButton,
  getUTXOAddresses,
  cancelButton,
  transactionTotalAmountField,
  transactionFeeText,
} from '../pages/connector-signingTxPage';
import { getSigningData, signMessageTitle } from '../pages/connector-signingDataPage';
import {
  addCollateralTitle,
  getCollateralTransactionFee,
} from '../pages/connector-getCollateralPage';
import { mockDAppName, extensionTabName, popupConnectorName } from '../support/windowManager';
import { connectorButton } from '../pages/sidebarPage';
import {
  ApiErrorCode,
  DataSignErrorCode,
  TxSignErrorCode,
} from '../support/helpers/connectorErrors';
import type { DAppConnectorResponse } from '../support/helpers/dapp-helpers';

const userRejectMsg = 'User Rejected';
const userRejectSigningMsg = 'User rejected';
const mockDAppUrl = `http://localhost:${Ports.DevBackendServer}/mock-dapp`;

const connectorPopUpIsDisplayed = async (customWorld: Object) => {
  await customWorld.driver.sleep(2000);
  await customWorld.windowManager.findNewWindowAndSwitchTo(popupConnectorName);
  const windowTitle = await customWorld.driver.getTitle();
  expect(windowTitle).to.equal('Yoroi Dapp Connector');
};

Given(/^I have opened the mock dApp$/, async function () {
  this.webDriverLogger.info(`Step: I have opened the mock dApp`);
  await this.get(mockDAppUrl);
});

Then(/^I open the mock dApp tab$/, async function () {
  this.webDriverLogger.info(`Step: I open the mock dApp tab`);
  await this.windowManager.openNewTab(mockDAppName, mockDAppUrl);
});

Given(/^I switch back to the mock dApp$/, async function () {
  this.webDriverLogger.info(`Step: I switch back to the mock dApp`);
  await this.windowManager.switchTo(mockDAppName);
});

When(/^I refresh the dApp page$/, async function () {
  this.webDriverLogger.info(`Step: I refresh the dApp page`);
  await this.windowManager.switchTo(mockDAppName);
  await this.driver.executeScript('location.reload(true);');
  // wait for page to refresh
  await this.driver.sleep(500);
});

Then(/^I request anonymous access to Yoroi$/, async function () {
  this.webDriverLogger.info(`Step: I request anonymous access to Yoroi`);
  await this.mockDAppPage.requestNonAuthAccess();
});

Then(/^I request access to Yoroi$/, async function () {
  this.webDriverLogger.info(`Step: I request access to Yoroi`);
  await this.mockDAppPage.requestAuthAccess();
});

Then(/^I should see the connector popup for connection$/, async function () {
  this.webDriverLogger.info(`Step: I should see the connector popup for connection`);
  await connectorPopUpIsDisplayed(this);
  await this.waitForElement(logoElement);
});

Then(/^I should see the connector popup for signing$/, async function () {
  this.webDriverLogger.info(`Step: I should see the connector popup for signing`);
  await connectorPopUpIsDisplayed(this);
  await this.waitForElement(transactionTotalAmountField);
});

Then(/^I should see the connector popup for signing data$/, async function () {
  this.webDriverLogger.info(`Step: I should see the connector popup for signing data`);
  await connectorPopUpIsDisplayed(this);
  await this.waitForElement(signMessageTitle);
});

Then(/^There is no the connector popup$/, async function () {
  this.webDriverLogger.info(`Step: There is no the connector popup`);
  const newWindows = await this.windowManager.findNewWindows();
  expect(newWindows.length).to.equal(0, 'A new window is displayed');
});

Then(
  /^I select the only wallet named (.+) with ([0-9.]+) balance$/,
  async function (expectedWalletName, expectedBalance) {
    this.webDriverLogger.info(
      `Step: I select the only wallet named ${expectedWalletName} with ${expectedBalance} balance`
    );
    const wallets = await getWallets(this);
    expect(wallets.length).to.equal(1, `expect 1 wallet but get ${wallets.length}`);
    const { walletName } = await getWalletNameAndPlate(wallets, 0);
    expect(walletName).to.equal(
      expectedWalletName,
      `expect wallet name ${expectedWalletName} but get wallet name ${walletName}`
    );
    const balance = await getWalletBalance(wallets, 0);
    expect(balance, 'Can not get wallet balance').to.not.be.null;
    const realBalanceDigitsOnly = balance.split(' ')[0];
    expect(realBalanceDigitsOnly).to.equal(
      expectedBalance,
      `expect wallet balance ${expectedBalance} but get ${realBalanceDigitsOnly}`
    );
    await selectWallet(wallets, 0);
    await this.driver.sleep(1000);
  }
);

Then(/^I enter the spending password (.+) and click confirm$/, async function (spendingPassword) {
  this.webDriverLogger.info(
    `Step: I enter the spending password ${spendingPassword} and click confirm`
  );
  await this.waitForElement(spendingPasswordInput);
  const text = await this.getValue(spendingPasswordInput);
  await this.clearInputUpdatingForm(spendingPasswordInput, text.length);
  await this.input(spendingPasswordInput, spendingPassword);
  await this.click(confirmButton);
});

Then(/^The popup window should be closed$/, async function () {
  this.webDriverLogger.info(`Step: The popup window should be closed`);
  const result = await this.windowManager.isClosed(popupConnectorName);
  expect(result, 'The window|tab is still opened').to.be.true;
  await this.windowManager.switchTo(mockDAppName);
});

Then(/^The access request should succeed$/, async function () {
  this.webDriverLogger.info(`Step: The access request should succeed`);
  const requestAccessResult = await this.mockDAppPage.checkAccessRequest();
  expect(
    requestAccessResult.success,
    `Request access failed: ${requestAccessResult.errMsg}`
  ).to.be.true;
  await this.mockDAppPage.addOnDisconnect();
});

Then(/^The user reject is received$/, async function () {
  this.webDriverLogger.info(`Step: The user reject is received`);
  const requestAccessResult = (await this.mockDAppPage.checkAccessRequest(): DAppConnectorResponse);
  expect(requestAccessResult.success, `Request access is granted`).to.be.false;
  const errorObject = requestAccessResult.error;
  expect(errorObject.code).to.equal(ApiErrorCode.Refused, 'Wrong error message');
  expect(errorObject.info).to.equal(userRejectMsg, 'Wrong error message');
});

Then(/^The dApp should see balance (\d+)$/, async function (expectedBalance) {
  this.webDriverLogger.info(`Step: The dApp should see balance ${expectedBalance}`);
  const balance = await this.mockDAppPage.getBalance();
  expect(balance).to.equal(
    String(expectedBalance),
    `expect balance ${expectedBalance} get balance ${balance}`
  );
});

When(/^I request signing the transaction:$/, async function (table) {
  this.webDriverLogger.info(`Step: I request signing the transaction`);
  const fields = table.hashes()[0];
  const normalizedAmount = `${parseFloat(fields.amount) * parseFloat('1000000')}`;
  this.webDriverLogger.info(
    `Step: I request signing the transaction: ${normalizedAmount} to address: ${fields.toAddress}`
  );
  await this.mockDAppPage.requestSigningTx(normalizedAmount, fields.toAddress);
});

Then(/^I should see the transaction amount data:$/, async function (table) {
  const fields = table.hashes()[0];

  this.webDriverLogger.info(
    `Step: I should see the transaction amount data: amount: ${fields.amount}, fee: ${fields.fee} `
  );
  await this.waitForElement(detailsTabButton);
  const realFee = await getTransactionFee(this);
  const realSentAmount = await getTransactionSentAmount(this);
  expect(realFee, 'Fee is different').to.equal(fields.fee);
  expect(realSentAmount, 'Sent amount is different').to.equal(fields.amount);
});

Then(/^I should see the transaction addresses info:$/, async function (table) {
  const fields = table.hashes()[0];

  this.webDriverLogger.info(
    `Step: I should see the transaction addresses info: from: ${fields.fromAddress}, to: ${fields.toAddress} `
  );
  await this.waitForElement(detailsTabButton);
  await this.click(utxosTabButton);
  const expectedFromAddress = fields.fromAddress;
  const expectedFromAddressAmount = fields.fromAddressAmount;
  const expectedToAddress = fields.toAddress;
  const expectedToAddressAmount = fields.toAddressAmount;
  const realAddresses = await getUTXOAddresses(this);
  const realFromAddresses = realAddresses.fromAddresses;
  const foundFromAddresses = realFromAddresses.filter(
    addr =>
      addr.address === expectedFromAddress && addr.amount === parseFloat(expectedFromAddressAmount)
  );
  expect(
    foundFromAddresses.length,
    `Expected fromAddress:
  address:${expectedFromAddress}, amount: ${expectedFromAddressAmount}
  Received:\n${JSON.stringify(realFromAddresses)}`
  ).to.equal(1);

  const realToAddresses = realAddresses.toAddresses;
  const foundToAddresses = realToAddresses.filter(
    addr =>
      addr.address === expectedToAddress && addr.amount === parseFloat(expectedToAddressAmount)
  );
  expect(
    foundToAddresses.length,
    `Expected toAddress:
  address: ${expectedFromAddress}, amount: ${expectedFromAddressAmount}
  Received:\n${JSON.stringify(realFromAddresses)}`
  ).to.equal(1);
  await this.click(detailsTabButton);
  await this.waitForElement(transactionFeeText);
});

Then(/^The signing transaction API should return (.+)$/, async function (txHex) {
  this.webDriverLogger.info(`Step: The signing transaction API should return ${txHex} `);
  const result = (await this.mockDAppPage.getSigningTxResult(): DAppConnectorResponse);
  expect(result.success).to.equal(true);
  expect(result.retValue).to.equal(txHex);
});

Then(/^I see the error Incorrect wallet password$/, async function () {
  this.webDriverLogger.info(`Step: I see the error Incorrect wallet password`);
  await this.waitForElement(spendingPasswordErrorField);
  expect(
    await this.isDisplayed(spendingPasswordErrorField),
    "The error isn't displayed"
  ).to.be.true;
  const errorText = await this.getText(spendingPasswordErrorField);
  expect(errorText).to.equal('Incorrect spending password. Please retype.');
});

Then(/^I should see no password errors$/, async function () {
  this.webDriverLogger.info(`Step: I should see no password errors`);
  expect(await this.isDisplayed(spendingPasswordErrorField), 'The error is displayed').to.be.false;
});

When(/^I click the back button \(Connector pop-up window\)$/, async function () {
  this.webDriverLogger.info(`Step: I click the back button (Connector pop-up window)`);
  await this.waitForElement(backButton);
  await this.click(backButton);
});

Then(/^I should see the wallet's list$/, async function () {
  this.webDriverLogger.info(`Step: I should see the wallet's list`);
  const wallets = await getWallets(this);
  expect(wallets.length, 'There are no wallets').to.not.equal(0);
});

Then(/^I close the dApp-connector pop-up window$/, async function () {
  this.webDriverLogger.info(`Step: I close the dApp-connector pop-up window`);
  await this.windowManager.closeTabWindow(popupConnectorName, mockDAppName);
});

Then(/^The wallet (.+) is connected to the website (.+)$/, async function (walletName, websiteUrl) {
  this.webDriverLogger.info(
    `Step: The wallet ${walletName} is connected to the website ${websiteUrl}`
  );
  await this.windowManager.switchTo(extensionTabName);
  // it should be reworked by using ui components when it is done
  await this.click(connectorButton);
  const wallets = await getWalletsWithConnectedWebsites(this);
  const result = wallets.filter(
    wallet => wallet.walletTitle === walletName && wallet.websiteTitle === websiteUrl
  );
  expect(result.length, `Result is not equal to 1:\n${JSON.stringify(result)}`).to.equal(1);
  await this.windowManager.switchTo(mockDAppName);
});

Then(/^I disconnect the wallet (.+) from the dApp (.+)$/, async function (walletName, dAppUrl) {
  this.webDriverLogger.info(`Step: I disconnect the wallet ${walletName} from the dApp ${dAppUrl}`);
  await this.windowManager.switchTo(extensionTabName);
  // it should be reworked by using ui components when it is done
  await this.click(connectorButton);
  await disconnectWallet(this, walletName, dAppUrl);
});

Then(/^I receive the wallet disconnection message$/, async function () {
  this.webDriverLogger.info(`Step: I receive the wallet disconnection message`);
  await this.windowManager.switchTo(mockDAppName);
  const isEnabledState = await this.mockDAppPage.isEnabled();
  expect(isEnabledState, 'The wallet is still enabled').to.be.false;
  const connectionState = await this.mockDAppPage.getConnectionState();
  expect(connectionState, 'No message from the dApp-connector is received').to.be.false;
});

Then(/^The user reject for signing is received$/, async function () {
  this.webDriverLogger.info(`Step: The user reject for signing is received`);
  await this.windowManager.switchTo(mockDAppName);
  const signingResult = (await this.mockDAppPage.getSigningTxResult(): DAppConnectorResponse);
  expect(signingResult.success).to.equal(false);
  const errorObject = signingResult.error;
  expect(errorObject.code, `The reject signing code is different`).to.equal(
    TxSignErrorCode.UserDeclined
  );
  expect(errorObject.info).to.equal(userRejectSigningMsg, 'Wrong error message');
});

Then(/^I should see "No Cardano wallets is found" message$/, async function () {
  this.webDriverLogger.info(`Step: I should see "No Cardano wallets is found" message`);
  await this.waitForElement(noWalletsImg);
  const state = await this.isDisplayed(noWalletsImg);
  expect(state, 'There is no "Ooops, no Cardano wallets found" message').to.be.true;
});

Then(/^I press the "Create wallet" button \(Connector pop-up window\)$/, async function () {
  this.webDriverLogger.info(`Step: I press the "Create wallet" button (Connector pop-up window)`);
  await this.waitForElement(createWalletBtn);
  await this.click(createWalletBtn);
});

Then(/^The pop-up is closed and the extension tab is opened$/, async function () {
  this.webDriverLogger.info(`Step: The pop-up is closed and the extension tab is opened`);
  const result = await this.windowManager.isClosed(popupConnectorName);
  expect(result, 'The window|tab is still opened').to.be.true;

  await this.windowManager.findNewWindowAndSwitchTo(extensionTabName);
  const windowTitle = await this.driver.getTitle();
  expect(windowTitle).to.equal(extensionTabName);
});

Then(/^I cancel signing the transaction$/, async function () {
  this.webDriverLogger.info(`Step: I cancel signing the transaction`);
  await this.click(cancelButton);
});

When(/^I request signing the data:$/, async function (table) {
  const fields = table.hashes()[0];
  const payload = fields.payload;
  this.webDriverLogger.info(`Step: I request signing the data: ${payload}`);
  await this.mockDAppPage.requestSigningData(payload);
});

Then(/^I should see the data to sign:$/, async function (table) {
  const fields = table.hashes()[0];
  const payload = fields.payload;
  this.webDriverLogger.info(`Step: I should see the data to sign: ${payload}`);
  const actualSigningData = await getSigningData(this);
  expect(actualSigningData, 'Signing Data is different').to.equal(payload);
});

Then(/^The signing data API should return (.+)$/, async function (dataHex) {
  this.webDriverLogger.info(`Step: The signing data API should return ${dataHex}`);
  const result = await this.mockDAppPage.getSigningDataResult();
  expect(result).to.equal(dataHex);
});

Then(/^The user reject for signing data is received$/, async function () {
  this.webDriverLogger.info(`Step: The user reject for signing data is received`);
  await this.windowManager.switchTo(mockDAppName);
  const signingResult = (await this.mockDAppPage.getSigningDataResult(): DAppConnectorResponse);
  expect(signingResult.success).to.equal(false);
  const errorObject = signingResult.error;
  expect(errorObject.code, `The reject signing code is different`).to.equal(
    DataSignErrorCode.UserDeclined
  );
  expect(errorObject.info).to.equal(userRejectSigningMsg, 'Wrong error message');
});

When(/^I ask to get Collateral for (.+) ADA$/, async function (amount) {
  this.webDriverLogger.info(`Step: I ask to get Collateral for ${amount} ADA`);
  const amountString = (parseFloat(amount) * 1000000).toString();
  await this.mockDAppPage.addCollateral(amountString);
});

Then(
  /^The dApp should see collateral: (.+) for (.+)$/,
  async function (expectedCollateral, utxosAmount) {
    const expectedUtxos = JSON.parse(expectedCollateral);
    this.webDriverLogger.info(
      `Step: The dApp should see collateral: ${expectedCollateral} for ${utxosAmount}`
    );
    const collateralResponse = (await this.mockDAppPage.getCollateral(
      utxosAmount
    ): DAppConnectorResponse);
    expect(collateralResponse.success).to.equal(true);
    expect(collateralResponse.retValue[0], 'Collateral is different to expected').to.be.deep.equal(
      expectedUtxos
    );
  }
);

Then(/^The dApp should receive collateral$/, async function (table) {
  const fields = table.hashes()[0];
  this.webDriverLogger.info(
    `Step: The dApp should receive collateral:\namount - ${fields.amount}, receiver - ${fields.receiver}`
  );
  const collateralResponse = (await this.mockDAppPage.getCollateralResult(): DAppConnectorResponse);
  expect(collateralResponse.success).to.equal(true);
  const collateralUtxuJson = collateralResponse.retValue[0];
  expect(collateralUtxuJson.amount, 'Amount is different').to.equal(fields.amount);
  expect(collateralUtxuJson.receiver, 'Receiver is different').to.equal(fields.receiver);
});

Then(/^I should see the connector popup to Add Collateral with fee info$/, async function (table) {
  this.webDriverLogger.info(
    `Step: I should see the connector popup to Add Collateral with fee info`
  );
  await connectorPopUpIsDisplayed(this);
  await this.waitForElement(addCollateralTitle);
  const fields = table.hashes()[0];
  const realFee = await getCollateralTransactionFee(this);
  expect(realFee, 'Fee is different').to.equal(fields.fee);
});

When(/^I request unused addresses$/, async function () {
  this.webDriverLogger.info(`Step: I request unused addresses`);
  await this.mockDAppPage.requestUnusedAddresses();
});

When(/^I request used addresses$/, async function () {
  this.webDriverLogger.info(`Step: I request used addresses`);
  await this.mockDAppPage.requestUsedAddresses();
});

When(/^The collateral received the error:$/, async function (table) {
  this.webDriverLogger.info(`Step: The collateral received the error`);
  const tableHashes = table.hashes();
  const fields = tableHashes[0];

  const collateralResult = await this.mockDAppPage.getCollateralResult();
  expect(collateralResult.success, `Request is successful but the error should be`).to.be.false;
  const errorObject = collateralResult.error;
  expect(errorObject.code).to.equal(parseInt(fields.code, 10), 'Wrong error code');
  expect(errorObject.info).to.include(fields.info, 'Wrong error info');
});
