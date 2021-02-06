#!/bin/zsh
echo "\e[4;32mEnter the commit message:\e[0m "
read a
git add --all
git commit -m $a
echo "\e[0;31mWant to push already? [yes/no]\e[0m"
read e
if [ "$e" = "yes" ] 
then
echo "\e[0;32mOk pushing\e[0m"
git push
echo "\e[0;35mDone!\e[0m"
else
echo "\e[0;36mAight commited\e[0m"
fi