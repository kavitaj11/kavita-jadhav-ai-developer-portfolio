# Google Cloud Deployment Guide

This project uses **Workload Identity Federation (WIF)** to deploy securely from GitHub to Google Cloud. This method is more secure than using static Service Account keys.

## 1. Prerequisites

*   A Google Cloud Project.
*   The `gcloud` CLI installed and authenticated.
*   Your GitHub repository path (e.g., `username/portfolio-repo`).

## 2. Automated Infrastructure Setup

We have provided a script to handle the complex IAM, API enablement, and OIDC configuration.

1.  **Open your terminal** in the project root.
2.  **Ensure you are logged in to gcloud**:
    ```bash
    gcloud auth login
    gcloud config set project YOUR_PROJECT_ID
    ```
3.  **Run the setup script**:
    ```bash
    chmod +x setup-gcp-deploy.sh
    ./setup-gcp-deploy.sh YOUR_PROJECT_ID YOUR_GITHUB_HANDLE/YOUR_REPO_NAME
    ```

## 3. Configure GitHub Secrets

The script will output three critical values. Add these to your GitHub repository under **Settings > Secrets and variables > Actions > New repository secret**:

| Secret Name | Value from Script Output |
|-------------|-------------------------|
| `GCP_PROJECT_ID` | Your Project ID |
| `GCP_SERVICE_ACCOUNT` | The `github-deployer@...` email |
| `GCP_WIF_PROVIDER` | The long path starting with `projects/...` |
| `API_KEY` | Your Google Gemini API Key |

## 4. Troubleshooting 'Permission Denied'

If you still see `PERMISSION_DENIED` for `iam.serviceAccounts.getAccessToken`:
*   Wait 2-5 minutes for IAM changes to propagate.
*   Verify that `GCP_WIF_PROVIDER` uses the **numeric** project number, not the project ID.
*   Ensure the `GITHUB_REPO` passed to the script exactly matches your repo (case-sensitive).
