#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#define MAX_LOG_SIZE 500000000 // 500MB
void filectl (int size,char *filename);
void justtype(int size);
int main() {
    int size=100;
    char *fileName="systemlog.txt";
    printf("welcome you have started run c program\n");
    while(1){
    printf("1.justtype\n");
    printf("2.filectl\n");
    printf("3.End\n");
    int choice;
    scanf("%d",&choice);
    switch(choice){
        case 1:
            justtype(size);
            break;
        case 2:
            filectl(size,fileName);
            break;
        case 3:
            printf("byebye\n");
            return 0;
        default:
            printf("Invalid choice\n");
            break;
    }
    }
    return 0;
}

void justtype(int size){
    printf("type exit to stop thie program\n");
    printf("you can type anything just you want\n");
    while(1){
        char *str =(char *)malloc(100);
        if(str==NULL){
            fprintf(stderr,"memory error , the program will stop right now\n");
            break;
            }
        if(fgets(str,sizeof(str),stdin)!=NULL){
            printf("you type is : %s\n",str);
            if(strcmp(str,"exit\n")==0){
                printf("byebye\n");break;
            }
            else{
                printf("you can type anything just you want\n");
            }
        }else{
            printf("How it happen!!! you typeing NULL\n");
        }
        free(str);
    }
}
void filectl (int size,char *filename) {
    printf("welcome here is filectl\n");  
    printf("you are ctl %s now\n",filename);
    printf("1.read file\n");
    printf("2.write file\n");
    printf("3.delete file\n");
    int *inputdata;
    inputdata = (int *)malloc(size * sizeof(int));
    memset(inputdata,0,size*sizeof(int));
    if(inputdata==NULL){
        printf("memory error!!\n");
        free(inputdata);
        exit(1);
    }

    if(scanf("%d",inputdata)!=1){
        printf("scanf data is equal NULL\n");
        exit(1);
    }
    switch(*inputdata){
        case 1:
            printf("file content: \n");
            char *filecontent;
            filecontent = malloc(size * sizeof(char));
            if(filecontent==NULL){
                printf("memory space not enough\n");
                free(filecontent);
                break;
            }
            FILE *file=fopen(filename,"r");
            if(file==NULL){
                printf("open file faild\n");
                break;
            }
            while(fgets(filecontent,sizeof(filecontent),file) !=NULL){
                printf("%s",filecontent);
            }
            break;
        case 2:
            printf("not yet\n");
            break;
        case 3:
            printf("not yet\n");
            break;
        default:
            printf("Invalid choice\n");
            break;
}
free(inputdata);    
}