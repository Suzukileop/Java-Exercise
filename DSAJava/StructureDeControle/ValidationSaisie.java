package DSAJava.StructureDeControle;
import java.util.Scanner;

public class ValidationSaisie {
    public static void main(String[] args) {
        boolean ValidationSaisie = false;
        Scanner scanner = new Scanner(System.in);

        System.out.println("Entrez votre age : ");
        Integer age = scanner.nextInt();

        ValidationSaisie = age instanceof Integer;
        

        while (age > 100 || age < 0 || ValidationSaisie != true) {
            System.out.println("Vous avez choisie la mauvaise valeur.\nReessayez : ");
            age = scanner.nextInt();
        }

        System.out.println("Vous avez " + age + "ans");
        
        scanner.close();
    }    
}
