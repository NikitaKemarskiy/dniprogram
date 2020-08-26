echo ">>> Starting deploy"
ssh root@95.215.207.62 -p 60022 "export DNIPROGRAM_VERSION=1.0; \
						/var/www/dniprogram/scripts/start.sh"