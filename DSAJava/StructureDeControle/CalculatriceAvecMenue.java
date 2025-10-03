package DSAJava.StructureDeControle;
import java.util.Scanner;

public class CalculatriceAvecMenue {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Entrer le premier nombre : ");
        double valeur1 = scanner.nextDouble();

        System.out.println("Entrer le deuxieme nombre : ");
        double valeur2 = scanner.nextDouble();

        System.out.println("Option d'operateur : ");
        System.out.println(" 0 pour + ");
        System.out.println(" 1 pour * ");
        System.out.println(" 2 pour - ");
        System.out.println(" 3 pour / \n");
        
        int operateur = scanner.nextInt();
        switch (operateur) {
            case 0 -> System.out.println(" valeur1 + valeur2  = " + (valeur1 + valeur2));
            case 1 -> System.out.println(" valeur1 + valeur2  = " + (valeur1 * valeur2));
            case 2 -> System.out.println(" valeur1 + valeur2  = " + (valeur1 / valeur2));
            case 3 -> {if (valeur2 == 0) {
                            System.out.println("impossible d'effectur la division par 0.");
                        } else {
                            System.out.println(" valeur1 + valeur2  = " + (valeur1 - valeur2));
                         };
                    }
            default -> System.out.println("Operateur non reconnue");
        }

    scanner.close();
    }
}
