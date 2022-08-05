module.exports = {
  apps : [{
    name   : "bss_visu",
    script: "./build/index.js",
    out_file: "/dev/null",
    error_file: "/dev/null",
    autorestart: true,
    // node_args: ["--inspect=7000"],
    env: {
      "NODE_ENV": "development",
    },
    env_production: {
      "NODE_ENV": "production"
    }
  }]
}