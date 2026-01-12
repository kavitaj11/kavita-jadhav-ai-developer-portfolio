# Google Cloud Deployment Guide

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
