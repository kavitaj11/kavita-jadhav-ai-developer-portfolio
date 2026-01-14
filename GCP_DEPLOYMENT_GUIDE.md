# Google Cloud Deployment Guide

# Google Cloud Deployment Guide

This project is optimized for **Google Cloud Run** using Workload Identity Federation (WIF).

## 1. Prerequisites

*   A Google Cloud Project with Billing enabled.
*   The `gcloud` CLI installed.
*   GitHub repository path (e.g., `kavitaj11/portfolio`).

## 2. Automated Setup

Run the provided setup script to configure IAM and Workload Identity Federation:

```bash
chmod +x setup-gcp-deploy.sh
./setup-gcp-deploy.sh [PROJECT_ID] [GITHUB_REPO_PATH]
```

## 3. Deployment as Instructed

To ensure your deployment is recognized by the DEV community and supports the standard embedding syntax, use the following command structure:

```bash
# Deploying to Cloud Run
gcloud run deploy kavita-portfolio \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --labels dev-tutorial=blog-devcommunity2026 \
  --set-env-vars="API_KEY=your_actual_key_here"
```

> **Note on Authentication:** While the tutorial example used `--no-allow-unauthenticated`, for a public portfolio that can be embedded at `{% embed your_cloud_run_url %}`, you **must** use `--allow-unauthenticated`.

## 4. Embedding on DEV.to

To embed your live portfolio in a DEV.to post or your profile:

1.  Copy your Cloud Run service URL.
2.  Use the following syntax in your markdown:
    `{% embed https://your-service-url-here.a.run.app %}`

## 5. GitHub Actions Configuration

Ensure the following secrets are set in your GitHub repository:
- `GCP_PROJECT_ID`
- `GCP_SERVICE_ACCOUNT`
- `GCP_WIF_PROVIDER`
- `API_KEY` (Your Gemini API Key)





This project uses **Workload Identity Federation (WIF)** to deploy securely from GitHub to Google Cloud without using long-lived Service Account keys.

## 1. Setup Infrastructure via CLI

Run these commands to set up the trust relationship between GitHub and GCP.

```bash
# Set your project ID
PROJECT_ID="your-project-id"
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
REPO="kavitaj11/kavita-jadhav-ai-developer-portfolio"

# Create Identity Pool
gcloud iam workload-identity-pools create "portfolio-pool" \
  --project="$PROJECT_ID" \
  --location="global"

# Create OIDC Provider
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --project="$PROJECT_ID" \
  --location="global" \
  --workload-identity-pool="portfolio-pool" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository"

# Allow Repo access to Service Account
gcloud iam service-accounts add-iam-policy-binding "your-service-account@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/portfolio-pool/attribute.repository/$REPO"
```

## 2. GitHub Secrets Configuration

Ensure the following Secrets are set in your GitHub Repository Settings:

| Secret Name | Value Example |
|-------------|---------------|
| `GCP_PROJECT_ID` | `my-portfolio-123` |
| `GCP_SERVICE_ACCOUNT` | `github-deploy-sa@my-portfolio-123.iam.gserviceaccount.com` |
| `GCP_WIF_PROVIDER` | `projects/123456789/locations/global/workloadIdentityPools/portfolio-pool/providers/github-provider` |
| `API_KEY` | `your-gemini-api-key` |


