import { EbayApiCredentials } from './types';

const ebayApiCredentials: EbayApiCredentials = {
  appId: process.env.EBAY_APP_ID || '', // Your eBay App ID
  certId: process.env.EBAY_CERT_ID || '', // Your eBay Cert ID
  devId: process.env.EBAY_DEV_ID || '', // Your eBay Dev ID
};

export default ebayApiCredentials;
