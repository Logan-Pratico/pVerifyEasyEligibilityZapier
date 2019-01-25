// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'recipe',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'EligibilityInquiry',
  display: {
    label: 'Create EligibilityInquiry',
    description: 'Generate a new EligibilityInquiry call through pVerify.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {key: 'Authorization', required: true, type: 'string'},
      {key: 'User', required: true, type: 'string'},
      {key: 'Cache', required: true, type: 'string'},
      {key: 'payerCode', required: true, type: 'string'},
      {key: 'ProviderFirstName', required: false, type: 'string'},
      {key: 'ProviderMiddleName', required: false, type: 'string'},
      {key: 'ProviderLastName', required: true, type: 'string'},
      {key: 'ProviderNPI', required: true, type: 'string'},
      {key: 'subscriberFirstName', required: false, type: 'string'},
      {key: 'subscriberMiddleName', required: false, type: 'string'},
      {key: 'subscriberLastName', required: false, type: 'string'},
      {key: 'subscriberMemberID', required: true, type: 'string'},
      {key: 'dependentFirstName', required: false, type: 'string'},
      {key: 'dependentMiddleName', required: false, type: 'string'},
      {key: 'dependentLastName', required: false, type: 'string'},
      {key: 'dependentDOB', required: true, type: 'string'},
      {key: 'dependentGender', required: false, type: 'string'},
      {key: 'relationWSubscriber', required: false, type: 'string'},
      {key: 'isSubscriberPatient', required: true, type: 'string'},
      {key: 'doSStartDate', required: true, type: 'string'},
      {key: 'doSEndDate', required: true, type: 'string'},
      {key: 'serviceCodes', required: true, type: 'string'},
      {key: 'requestSource', required: true, type: 'string'},
    ],
    perform: (z, bundle) => {
      const promise = z.request({
        url: 'https://api.pverify.com/API/EligibilityInquiry',
        method: 'POST',
        body: JSON.stringify({
          payerCode: bundle.inputData.payerCode,
          provider: {
		firstName: bundle.inputData.ProviderFirstName,
		middleName: bundle.inputData.ProviderMiddleName,
		lastName: bundle.inputData.ProviderLastName,
		npi: bundle.inputData.ProviderNPI	
		},
	subscriber: {
		firstName: bundle.inputData.subscriberFirstName,
		middleName: bundle.inputData.subscriberMiddleName,
		lastName: bundle.inputData.subscriberLastName,
		memberID: bundle.inputData.subscriberMemberID
	},
	dependent: {
		patient:{
			firstName: bundle.inputData.dependentFirstName,
			middleName: bundle.inputData.dependentMiddleName,
			lastName: bundle.inputData.dependentLastName,
			dob: bundle.inputData.dependentDOB,
			gender: bundle.inputData.dependentGender
		},
		relationWithSubscriber: bundle.inputData.relationWSubscriber
	},
	isSubscriberPatient: bundle.inputData.isSubscriberPatient,
	doS_StartDate: bundle.inputData.doSStartDate,
	doS_EndDate: bundle.inputData.doSEndDate,
	serviceCodes: [bundle.inputData.serviceCodes],
	requestSource: bundle.inputData.requestSource
        }),
        headers: {
	  'Authorization': bundle.inputData.Authorization,
	  'Client-User-Name': bundle.inputData.User,
          'content-type': 'application/json',
	  'cache-control': 'no-cache',

          'X-API-Key': 'secret'
        }
      });

      return promise.then((response) => JSON.parse(response.content));
    },

  }
};
