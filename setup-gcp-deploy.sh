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