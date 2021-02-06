echo "Enter the commit message: "
read a
git add --all
git commit -m $a
echo "\e[0;31mWant to push already? [yes/no]"
read e
if [ "$e" = "yes" ] 
then
echo "Ok pushing"
git push
echo "Done!"
else
echo "Aight commited"
fi