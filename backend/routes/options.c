// does command-line options processing
#include "options.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <unistd.h>

bool parse_options(int argc, char **argv, struct Options *options) {
    // define default
    options->input_method = RDRAND;
    options->file_path = NULL;
    options->nbytes = 0;

    int opt;
    while ((opt = getopt(argc, argv, "i:")) != -1) { // iterates through each option provided in command line
        switch (opt) {
            case 'i':
                if (strcmp(optarg, "rdrand") == 0) {
                    options->input_method = RDRAND;
                }
                else if (strcmp(optarg, "lrand48_r") == 0) {
                    options->input_method = LRAND48_R;
                }
                else if (strcmp(optarg, "mrand48") == 0) {
                    options->input_method = MRAND48;
                }
                else if (optarg[0] == '/') {
                    options->input_method = FILE_INPUT;
                    options->file_path = optarg;
                } else {
                    fprintf(stderr, "Invalid input method: %s\n", optarg);
                    return false;
                }
                break;
            case 'o':
                if (strcmp(optarg, "stdio") == 0) {
                    options->output_method = STDIO;
                } else {
                    char *endptr;
                    long write_n = strtol(optarg, &endptr, 10);
                    if (*endptr == '\0' && write_n > 0) {
                        options->output_method = WRITE_N;
                        options->write_n = (int)write_n;
                    } else {
                        fprintf(stderr, "Invalid output option: %s\n", optarg);
                        return false;
                    }
                }
                break;
            default:
                return false;
        }
    }

    if (optind >= argc) { // optind looks at next arg (NBYTES)
        fprintf(stderr, "Expected argument for NBYTES\n");
        return false;
    }

    char *endptr;
    errno = 0;
    options->nbytes = strtoll(argv[optind], &endptr, 10);

    if (errno || *endptr || options->nbytes < 0) {
        fprintf(stderr, "Invalid value for NBYTES: %s\n", argv[optind]);
        return false;
    }

    return true;

}