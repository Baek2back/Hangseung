#include <signal.h> //Signal 사용 헤더파일
#include <unistd.h>
#include <wiringPi.h>
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

#define RGBLEDPOWER  24 //BCM_GPIO 19
 
#define RED        4 //27
#define GREEN    3 //28
#define BLUE    7 //29
void sig_handler(int signo); // SIGINT 사용 마지막 종료 함수

int turn_on_green(){
	printf("%s\n", "Green Light ON!");
	digitalWrite(RGBLEDPOWER, 1);
	digitalWrite(RED, 0);
    digitalWrite(BLUE, 1);
    digitalWrite(GREEN, 0);
	return 0;
}

int turn_off_green(){
	printf("%s\n", "Green Light OFF!");
	kill(getpid(), SIGINT);

	
	return 0;
}

int turn_on_blue(){
	printf("%s\n", "Blue Light ON!");
	digitalWrite(RED, 0);
    digitalWrite(BLUE, 0);
    digitalWrite(GREEN, 1);
	return 0;
}

int turn_off_blue(){
	printf("%s\n", "Blue Light OFF!");
	kill(getpid(), SIGINT);
	
	return 0;
}

int init(){
	printf("%s\n", "Init Light!");
	pinMode(RGBLEDPOWER, OUTPUT);
    pinMode(RED, OUTPUT);
    pinMode(GREEN, OUTPUT);
    pinMode(BLUE, OUTPUT);
	// pinMode(RGBLEDPOWER, HIGH);
}

int main (int argc,char *argv[])
{
	int i;
    for (i=0; i < argc; i++)
        printf("Argument %d is %s\n", i, argv[i]);
	signal(SIGINT, (void *)sig_handler);    //시그널 핸들러 함수
	if (wiringPiSetup () == -1)
    {
        fprintf(stdout, "Unable to start wiringPi: %s\n", strerror(errno));
        return 1 ;
    }
  
    pinMode(RGBLEDPOWER, OUTPUT);
    pinMode(RED, OUTPUT);
    pinMode(GREEN, OUTPUT);
    pinMode(BLUE, OUTPUT);

	if(argc == 2){
		char* comm = argv[1];
		if(!strcmp(comm, "1")){
			turn_on_green();
		} else if(!strcmp(comm, "2")){
			turn_off_green();
		} else if(!strcmp(comm, "3")){
			turn_on_blue();
		} else if(!strcmp(comm, "4")){
			turn_off_blue();
		}else if(!strcmp(comm, "0")){
			init();
		}
	}

	return 0 ;
}

void sig_handler(int signo)
{
    printf("process stop\n");
    
    digitalWrite(RED, 1);
    digitalWrite(GREEN, 1);
    digitalWrite(BLUE, 1);
    digitalWrite(RGBLEDPOWER, 0); //Off
    
    exit(0);
}
 
