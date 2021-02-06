echo "Enter the commit message: "
read a
git add --all
git commit -m $a
echo "Want to push already? [yes/no]"
read e
if [ "$e" = "yes" ] 
then
echo "Ok pushing"
git push
else
echo "Aight commited"
fi