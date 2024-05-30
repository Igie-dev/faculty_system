# For docker testing by running docker compose
# Wait for the database to be ready
while ! nc -z postgres 5432; do
    sleep 1
done

npm run db:generate

npm run db:migrate & PID=$!

wait $PID

# npm run db:seed

npm run dev