// this is for pre emptive scheduling via SJF
#include <stdio.h>
int MAX_SIZE = 10;

typedef struct proc {
    int proc_id, arr_time, burst_time;   
}proc;

proc *process[MAX_SIZE];
int idx = 0;

proc init(proc *c){
    c->proc_id = c->arr_time = c->burst_time = 0;   
}

proc take_input(proc *c, int proc_id, int arr_time, int burst_time){
    c->proc_id = proc_id;
    c->arr_time = arr_time;
    c->burst_time = burst_time;
    process[idx] = c; idx++;
} 

proc process(){

}
