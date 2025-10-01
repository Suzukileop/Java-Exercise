
import java.util.Scanner;

public class ConversionSecondeHeureMinute {
    public static void main(String[] args) {
        int h, mn, s;
        double reste;

        Scanner scanner = new Scanner(System.in);

        System.out.println("Entrez une valeur de seconde : ");
        double seconde = scanner.nextDouble();

        //Calcul d'heure 
        double valeur1 = seconde / 3600 ;
        h = (int) valeur1;
        reste = valeur1 - h;

        //Calcul de minute et seconde 
        double valeur2 = reste * 60;

        mn = (int) valeur2;
        reste = valeur2 - mn;
        s = (int) ( reste * 10);

        System.out.println(seconde + " =  heure: " + h + " mn: " + mn + " s: " + s);

        scanner.close();
    }
}
