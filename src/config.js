export default {
	MAX_ATTACHMENT_SIZE: 5000000,
	STRIPE_KEY: "pk_test_wuE2uJKr8Bwz3LYaynePGERb00KVMx9p0W",
	s3: {
	  REGION: "ap-northeast-2",
	  BUCKET: "note5916"
	},
	apiGateway: {
	  REGION: "ap-northeast-2",
	  URL: "https://8bfxviq4s6.execute-api.ap-northeast-2.amazonaws.com/prod"
	},
	cognito: {
	  REGION: "ap-northeast-2",
	  USER_POOL_ID: "ap-northeast-2_xENS2FY48",
	  APP_CLIENT_ID: "5thbdlq0mtk7quhkkghp7j7j98",
	  IDENTITY_POOL_ID: "ap-northeast-2:e4c35c92-ee66-4f46-8c6e-50ec3ce13e98"
	}
  };