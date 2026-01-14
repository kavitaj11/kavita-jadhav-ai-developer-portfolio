
# Google Cloud Deployment Guide (Service Account Method)

This is the most reliable way to deploy to Cloud Run if Workload Identity Federation (WIF) is causing `invalid_target` or `PERMISSION_DENIED` errors.

## 1. Create a Service Account
1.  Go to **IAM & Admin > Service Accounts**.
2.  Click **Create Service Account**.
3.  Name it `github-deployer`.
4.  Grant it the following roles:
	- `Cloud Run Admin`
	- `Storage Admin`
	- `Service Account User`
	- `Cloud Build Editor`
	- `Artifact Registry Administrator`

## 2. Generate a Key
1.  In the Service Accounts list, click on your new account.
2.  Go to the **Keys** tab.
3.  Click **Add Key > Create New Key**.
4.  Select **JSON** and download the file.

## 3. Configure GitHub Secrets
Add these to **Settings > Secrets and variables > Actions**:

| Secret Name | Value |
|-------------|-------|
| `GCP_SA_KEY` | Paste the **entire content** of the JSON key file you downloaded. |
| `API_KEY` | Your Google Gemini API Key. |

## 4. Push to Deploy
The next push to `main` will use this key to authenticate directly, bypassing the WIF provider configuration errors.

