echo ">>> Deploy now..."

# ssh -p 2222 nikita@77.47.209.52 "docker stop color-pick; \
# 								 docker rm color-pick; \
# 								 docker run -p 80:80 --name color-pick -d kemarskiy/color-pick:1.0"