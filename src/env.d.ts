interface ImportMetaEnv {
	/** Set by .github/workflows/preview.yml on pull-request preview builds. */
	readonly PUBLIC_PR_NUMBER?: string;
	/** https://github.com/<owner>/<repo>, set alongside PUBLIC_PR_NUMBER. */
	readonly PUBLIC_REPO_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
