.PHONY: buikd
build:
	docker-compose build

.PHONY: start
start:
	docker-compose up -d

.PHONY: logs
logs:
	docker logs -f --since 2h --tail 200 collect-points-api

.PHONY: cli
cli:
	docker-compose exec app sh
