# 1. Ensure gcloud is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format='value(account)' | grep .; then
  echo "No active gcloud account found. Please authenticate."
  gcloud auth login
fi

# 2. Load variables from .env
set -o allexport
if [ -f .env ]; then
  # Convert .env to shell format and source it
  sed 's/^\([A-Za-z_][A-Za-z0-9_]*\):/export \1=/' .env > .env.sh
  source .env.sh
  rm .env.sh
fi
set +o allexport

# 3. Configuration
export PROJECT_ID="$PROJECT_ID"
export REGION="$REGION"
export SERVICE="$SERVICE"
export OAUTH_CLIENT_ID="$OAUTH_CLIENT_ID"
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
export POOL_NAME="portfolio-pool"
export PROVIDER_NAME="github-provider"
export REPO="kavitaj11/kavita-jadhav-ai-developer-portfolio"
export SA_NAME="github-deploy-sa"

# 4. Enable Required APIs
gcloud services enable iamcredentials.googleapis.com sts.googleapis.com --project "${PROJECT_ID}"

# 5. Create Workload Identity Pool
gcloud iam workload-identity-pools create "${POOL_NAME}" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --display-name="GitHub Actions Pool"

# 6. Create OIDC Provider
gcloud iam workload-identity-pools providers create-oidc "${PROVIDER_NAME}" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="${POOL_NAME}" \
  --display-name="GitHub Actions Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# 7. Create Service Account and Bind Permissions
gcloud iam service-accounts create "${SA_NAME}" --project "${PROJECT_ID}"

gcloud iam service-accounts add-iam-policy-binding "${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --project="${PROJECT_ID}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_NAME}/attribute.repository/${REPO}"

# 8. Output the values for your GitHub Secrets
echo "--- COPY THESE TO GITHUB SECRETS ---"
echo "GCP_PROJECT_ID: ${PROJECT_ID}"
echo "GCP_SERVICE_ACCOUNT: ${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
echo "GCP_WIF_PROVIDER: projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_NAME}/providers/${PROVIDER_NAME}"

echo "\nScript complete. Press Enter to exit."
read