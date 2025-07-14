# Start with the base Ubuntu image
FROM ubuntu:22.04

# Set the timezone
ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install necessary dependencies
RUN apt-get update -yqq \
    && apt-get install -yqq --no-install-recommends \
    software-properties-common \
    sudo curl wget cmake make pkg-config locales git \
    gcc-11 g++-11 openssl libssl-dev libjsoncpp-dev uuid-dev \
    zlib1g-dev libc-ares-dev postgresql-server-dev-all \
    libmariadb-dev libsqlite3-dev libhiredis-dev \
    && rm -rf /var/lib/apt/lists/* \
    && locale-gen en_US.UTF-8

# Set environment variables for localization
ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 \
    CC=gcc-11 \
    CXX=g++-11 \
    AR=gcc-ar-11 \
    RANLIB=gcc-ranlib-11 \
    IROOT=/install

# Clone Drogon repository
ENV DROGON_ROOT="$IROOT/drogon"
RUN git clone https://github.com/drogonframework/drogon $DROGON_ROOT

# Set the working directory to Drogon repository
WORKDIR $DROGON_ROOT

# Build Drogon
RUN ./build.sh

# Copy source code for your application (from the local directory)
COPY . /app

# Install build tools for the app 

RUN apt-get update && apt-get install -y cmake g++ git

# Pull submodules for your application
RUN git submodule update --init --recursive

# Create build directory and build the project
RUN mkdir -p /app/build && cd /app/build && cmake .. && make -j$(nproc)

# Set CMD to the actual binary
CMD ["./build/org_chart"]
