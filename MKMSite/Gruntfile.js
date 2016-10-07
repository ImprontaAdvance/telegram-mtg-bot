module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    var globalConfig = {
        src: '.',
        dest: 'view'
    };

    grunt.initConfig({
        globalConfig: globalConfig,


    //         ******   ********  ********
		//        **////** **//////  **//////
		//       **    // /**       /**
		//      /**       /*********/*********
		//      /**       ////////**////////**
		//      //**    **       /**       /**
		//       //******  ********  ********
		//        //////  ////////  ////////


        less: {
            options: {
                compress: false
            },
            development: {

                files: {
                    '<%= globalConfig.dest  %>/css/main.css': '<%= globalConfig.src  %>/less/main.less' // destination file and source file
                }
            }
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}),
                    //require('cssnano')()
                ]
            },
            dist: {
                src: '<%= globalConfig.dest  %>/css/*.css'
            }
        },


    //            **  ********
		//           /** **//////
		//           /**/**
		//           /**/*********
		//           /**////////**
		//       **  /**       /**
		//      //*****  ********
		//       /////  ////////


        browserify: {
            dist: {
                options: {
                    transform: [
                        ['babelify', {
                            presets: ['es2015', 'react', 'stage-2']
                        }]
                    ]
                },
                files: {
                    '<%= globalConfig.dest %>/js/main.js': '<%= globalConfig.src %>/js/main.js',
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            myTarget: {
                files: {
                    '<%= globalConfig.dest  %>/js/main.min.js': ['<%= globalConfig.dest  %>/js/main.js']
                }
            }
        },


    //       **      ** ********** ****     **** **
		//      /**     /**/////**/// /**/**   **/**/**
		//      /**     /**    /**    /**//** ** /**/**
		//      /**********    /**    /** //***  /**/**
		//      /**//////**    /**    /**  //*   /**/**
		//      /**     /**    /**    /**   /    /**/**
		//      /**     /**    /**    /**        /**/********
		//      //      //     //     //         // ////////


        // 'compile-handlebars': {
        //     allStatic: {
        //         files: [{
        //             src: '<%= globalConfig.src  %>/view/*.hbs',
        //             dest: '<%= globalConfig.dest  %>/*.html'
        //         }],
        //         // preHTML: 'test/fixtures/pre-dev.html',
        //         // postHTML: 'test/fixtures/post-dev.html',
        //         templateData: '<%= globalConfig.src  %>/view/data.json',
        //         partials: '<%= globalConfig.src  %>/view/partials/*.hbs',
        //         registerFullPath: false
        //     },
        // },


    //       ****     **** **  ********   ******
		//      /**/**   **/**/** **//////   **////**
		//      /**//** ** /**/**/**        **    //
		//      /** //***  /**/**/*********/**
		//      /**  //*   /**/**////////**/**
		//      /**   /    /**/**       /**//**    **
		//      /**        /**/** ********  //******
		//      //         // // ////////    //////

        clean: {
            all: ['<%= globalConfig.dest  %>'],
            hbs: ['<%= globalConfig.dest  %>/*.html']
        },

        copy: {
            main: {
                expand: true,
                cwd: '<%= globalConfig.src  %>',
                src: ['*.html'],
                dest: '<%= globalConfig.dest  %>/',
            },

            images: {
                expand: true,
                cwd: '<%= globalConfig.src  %>',
                src: ['img/**'],
                dest: '<%= globalConfig.dest  %>/'
            },
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: '*',
                    base: 'view'
                }
            }
        },

        watch: {
            pages: {
                files: ['<%= globalConfig.src  %>/*'], // which files to watch
                tasks: ['copy'],
                options: {
                    livereload: true,
                    nospawn: true
                }
            },
            styles: {
                files: ['<%= globalConfig.src  %>/less/**'], // which files to watch
                tasks: ['less'],
                options: {
                    livereload: true,
                    nospawn: true
                }
            },
            scripts: {
                files: ['<%= globalConfig.src  %>/js/**'], // which files to watch
                tasks: ['browserify'],
                options: {
                    livereload: true,
                    nospawn: true
                }
            },
            // hbs: {
            //     files: ['<%= globalConfig.src  %>/view/**'], // which files to watch
            //     tasks: ['clean:hbs', 'compile-handlebars'],
            //     options: {
            //         livereload: true,
            //         nospawn: true
            //     }
            // },
        }
    });

    grunt.registerTask('default', ['builddev', 'connect', 'watch']);
    grunt.registerTask('builddev', ['clean', 'less', 'postcss', 'browserify', 'copy']);
    grunt.registerTask('buildprod', ['builddev', 'cssmin', 'uglify']);
};
