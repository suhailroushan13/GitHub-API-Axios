source config


git clone git@github.com:${instructor}/${repoName}.git
cd ${repoName}
touch README.md
echo ${description} > README.md
git add .
git commit -m "First Commit Using API"
git push origin master

set -e


export user="${instructor}":"${token}"
export branch="master"

declare -a repositories=(
    "repo-scripts"
    "sbt-dependency-updates-action"
)

JSON=$(cat << 'EOF'
    {
        "required_status_checks": null,
        "enforce_admins": false,
        "required_pull_request_reviews": {
            "required_approving_review_count": 1
        },
        "restrictions": null
    }
EOF
)

for i in "${repositories[@]}"; do
    echo "========"
    echo "=======> Working "
    echo "========"

    curl \
        --silent \
        --user $user \
        --header "Accept: application/vnd.github.v3+json" \
        --request PUT \
        https://api.github.com/repos/${instructor}/${repoName}/branches/master/protection \
        --data "$JSON"

done

echo "Sucessfully Completed Task ✅"