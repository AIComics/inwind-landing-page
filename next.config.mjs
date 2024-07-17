import { withSentryConfig } from "@sentry/nextjs";
import * as process from "process";

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		instrumentationHook: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'landingpage.huglemon.com',
			},
		],
	},
};

export default withSentryConfig(nextConfig, {
	org: process.env.SENTRY_ORG,
	project: process.env.SENTRY_PROJECT,

	// An auth token is required for uploading source maps.
	authToken: process.env.SENTRY_AUTH_TOKEN,

	silent: false, // Can be used to suppress logs
});
